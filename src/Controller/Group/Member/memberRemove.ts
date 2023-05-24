import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbMemberRemove } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";

export default async function memberRemove(
  req : Request,
  res : Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;

  const memberId = parseInt(req.params.mid);
  const groupId = parseInt(req.params.gid);

  if ( !groupId ) return res.sendStatus(400);
  if ( !memberId ) return res.sendStatus(400);
  try {
    
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const currentGroup = await dbGroupGet(groupId);
    if ( !currentGroup ) return res.sendStatus(404);

    if ( currentGroup.ownerId !== currentUser.id )
      return res.sendStatus(403);

    const member = await dbMemberRemove(memberId);

    const memberView = memberViewer(member);
    return res.status(201).json({ member: memberView });
  } catch (error) {
    return next(error)
  }
}
