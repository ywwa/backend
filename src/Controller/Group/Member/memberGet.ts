import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberGet } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

export default async function fnMemberGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.gid);
  const userId = parseInt(req.params.mid);

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403); // user not authenticated
    }

    const requestedGroup = await dbGroupGet(groupId);
    if (!requestedGroup) {
      return res.sendStatus(404); // group not found
    }

    if (requestedGroup.ownerId !== authenticatedUser.id) {
      return res.sendStatus(403); // user has no permission
    }

    const requestedMember = await dbMemberGet({ groupId, userId });
    if (!requestedMember) {
      return res.sendStatus(404); // member not found
    }

    const requestedMemberview = memberViewer(requestedMember);

    return res.status(201).json({ member: requestedMemberview });
  } catch (error) {
    return next(error);
  }
}
