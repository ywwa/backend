import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberCreate } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

interface NewMember {
  userId: number;
  groupId: number;
}

export default async function fnMemberAdd(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.id);

  const newMemberData: NewMember = req.body.member;

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403); // user unauthenticated
    }

    const currentGroup = await dbGroupGet(groupId);
    if (!currentGroup) {
      return res.sendStatus(404); // group not found
    }

    if (currentGroup.ownerId !== authenticatedUser.id) {
      return res.sendStatus(403); // no rights
    }

    const newMember = await dbMemberCreate(newMemberData);
    const memberView = memberViewer(newMember);

    return res.json({ member: memberView });
  } catch (error) {
    return next(error);
  }
}
