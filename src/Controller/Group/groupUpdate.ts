import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import { dbGroupGet } from "../../Utils/Database/Group";
import { dbGroupUpdate } from "../../Utils/Database/Group";
import { groupViewer } from "../../View";

interface UpdateFields {
  name?: string;
  description?: string;
}

export default async function fnGroupUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.id);

  const newGroupData: UpdateFields = req.body.group;
  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403); // user is not authenticated
    }

    const updatableGroup = await dbGroupGet(groupId);
    if (!updatableGroup) {
      return res.sendStatus(404); // group not found
    }

    if (updatableGroup.ownerId !== authenticatedUser.id) {
      return res.sendStatus(403); // user has no rights to update group
    }

    const updatedGroup = await dbGroupUpdate(groupId, newGroupData);
    const groupView = groupViewer(updatedGroup);

    return res.status(201).json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
