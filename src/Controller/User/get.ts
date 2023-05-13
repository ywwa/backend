import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createUserToken } from "../../Util/Auth";
import { dbUserGet } from "../../Util/Database/User";
import { userViewer } from "../../View";

/**
 * Controller that gets the current user based on the jwt given
 * 
 * @param req Request with an authenticated user on the auth property
 * @param res Response
 * @param next NextFunction
 */
export default async function get(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const username = req.auth?.user.username;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const token = createUserToken(currentUser);
    const view = userViewer(currentUser, token);

    return res.json(view);

  } catch (error) {
    return next(error);
  };
}

