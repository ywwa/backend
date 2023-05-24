import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupUpdate } from "../../Utils/Database/Group";
import { dbUserGet } from "../../Utils/Database/User";
import { groupViewer } from "../../View";

/**
 * Group controller that must receive a request with an authenticated user
 * in order to update the group with data in provided in requests body.
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
  const username = req.auth?.user?.username;

  const { name, description } = req.body.group;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.status(404);

    const group = await dbGroupUpdate(id, { name, description });

    const groupView = groupViewer(group);

    return res.status(201).json({ group: groupView });
  } catch (error) {
    return next(error);
  }
}
