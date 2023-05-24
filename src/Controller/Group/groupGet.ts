import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupGet } from "../../Utils/Database/Group";
import { groupViewer } from "../../View";
import { dbUserGet } from "../../Utils/Database/User";

/**
 * Group controller that gets group.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function groupGet(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const username = req.auth?.user?.username;
  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const group = await dbGroupGet(id);
    if ( !group ) return res.sendStatus(404);

    if (group.ownerId !== currentUser.id ) return res.sendStatus(403);
    
    const groupView = groupViewer(group);
    
    return res.json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
