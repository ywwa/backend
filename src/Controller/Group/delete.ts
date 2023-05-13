import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Util/Database/User";
import { dbGroupGet, dbGroupDelete } from "../../Util/Database/Group";
import { groupViewer } from "../../View";

/**
 * Controller that must receive a request with an authorized user.
 * The parameters of a request must have a group id.
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
    if ( !currentUser ) return res.sendStatus(401);
    
    const targetGroup = await dbGroupGet(id);
    if ( !targetGroup ) return res.sendStatus(404);

    if ( targetGroup.ownerId !== currentUser.id ) {
      return res.sendStatus(403);
    }

    const group = await dbGroupDelete(id);
    const view = groupViewer(group);

    return res.status(200).json(view);

  } catch (error) {
    return next(error);
  }
};

