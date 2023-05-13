import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupGet, dbGroupUpdate } from "../../Util/Database/Group";
import { groupViewer } from "../../View";
import { dbUserGet } from "../../Util/Database/User";

/**
 * Controller that receives request with an authorized user.
 * Parameters of the request must have group id.
 * Body of the request must have an group object with optional fields.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function groupUpdate(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);
  const { name, description } = req.body.group;
  const username = req.auth?.user?.username;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(401);

    const targetGroup = await dbGroupGet(id);
    if ( !targetGroup ) return res.sendStatus(404);

    if ( currentUser.id !== targetGroup.ownerId ) {
      return res.status(403);
    }

    const group = await dbGroupUpdate(id, {
      name, description
    });

    const view = groupViewer(group);
    
    return res.status(200).json({ group: view });
  } catch (error) {
    return next(error);
  }
};

