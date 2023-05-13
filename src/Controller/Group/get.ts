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

    // somewher is issue that causes infinite request loading
    const group = await dbGroupGet(id);
    if ( !group ) return res.sendStatus(404);

    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(403);

    // if ( group.ownerId !== currentUser.id )
    //   return res.status(403);

    const view = groupViewer(group);

    return res.status(200).json({ group: view });
  } catch (error) {
    return next(error);
  }
};

