import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMembersGet } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

export default async function fnMembersGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const groupId = parseInt(req.params.id);
  const username = req.auth?.user?.username;

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

    const groupMembers = await dbMembersGet(groupId);

    const membersView = groupMembers.map((member) =>
      memberViewer(member, false)
    );

    return res.json({ members: membersView });
  } catch (error) {
    return next(error);
  }
}
