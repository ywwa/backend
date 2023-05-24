import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberAdd } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

/**
 * Member Controller that requires authenticated user in the headers in order
 * to add new member to the group.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function memberAdd(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.id);
  const { id } = req.body.member;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const currentGroup = await dbGroupGet(groupId);
    if ( !currentGroup ) return res.sendStatus(404);

    if ( currentGroup.ownerId !== currentUser.id )
      return res.sendStatus(403);

    const member = await dbMemberAdd(groupId, id);

    const memberView = memberViewer(member);

    return res.status(201).json({ member: memberView });
  } catch (error) {
    return next(error);
  }
}
