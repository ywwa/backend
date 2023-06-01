import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import { dbGroupGet } from "../../Utils/Database/Group";
import { groupViewer } from "../../View";

export default async function fnGroupGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.id);

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403);
    }

    const requestedGroup = await dbGroupGet(groupId);
    if (!requestedGroup) {
      return res.sendStatus(404);
    }

    if (requestedGroup.ownerId !== authenticatedUser.id) {
      return res.sendStatus(403);
    }

    const groupView = groupViewer(requestedGroup);

    return res.json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
