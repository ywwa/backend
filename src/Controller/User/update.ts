import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createUserToken } from "../../Util/Auth";
import { dbUserUpdate } from "../../Util/Database/User";
import { userViewer } from "../../View";

/**
 * Controller that updates the current user with information given in the body
 * of hte request
 * 
 * @param req Request with authenticated user in the auth property and
 * information in the body of the request.
 * @param res Response
 * @param next NextFunction
 */
export default async function update(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;
  const data     = req.body.user;

  try {
    const updatedUser = await dbUserUpdate(username, data);
    if ( !updatedUser ) return res.sendStatus(404);

    const token = createUserToken(updatedUser);
    const view = userViewer(updatedUser, token);

    return res.json(view);
  } catch (error) {
    return next(error);
  };
}

