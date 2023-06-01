import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import { dbGroupCreate } from "../../Utils/Database/Group";
import { groupViewer } from "../../View";

interface NewGroup {
  name: string;
  description: string;
}

export default async function fnGroupCreate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const newGroupData: NewGroup = req.body.group;

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.status(403);
    }

    const newGroup = await dbGroupCreate(newGroupData, authenticatedUser.id);
    const groupView = groupViewer(newGroup);

    return res.status(201).json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
