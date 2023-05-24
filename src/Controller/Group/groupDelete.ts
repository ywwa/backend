import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupDelete, dbGroupGet } from "../../Utils/Database/Group";
import { groupViewer } from "../../View";
import { dbUserGet } from "../../Utils/Database/User";

/**
 * Group controller that takes authenticated user in headers and group id in
 * params in order to delete the group.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function groupDelete(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const username = req.auth?.user?.username;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const currentGroup = await dbGroupGet(id);
    if ( !currentGroup ) return res.sendStatus(404);

    if (currentGroup.ownerId !== currentUser.id )
      return res.sendStatus(403);

    const group = await dbGroupDelete(id);
    const groupView = groupViewer(group);

    return res.status(201).json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
