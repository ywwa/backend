import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupGet } from "../../Util/Database/Group";
import { groupViewer } from "../../View";
import { dbUserGet } from "../../Util/Database/User";

/**
 * Controller that receive request with group id in parameters.
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
    // get current user and if no user found return HTTP_403
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(403);

    // get group by id and if no group found return HTTP_404
    const group = await dbGroupGet(id);
    if ( !group ) return res.sendStatus(404);

    if ( group.ownerId !== currentUser.id ) return res.sendStatus(403);

    const view = groupViewer(group);
    return res.status(200).json({ group: view });
  } catch (error) {
    return next(error);
  }
};

