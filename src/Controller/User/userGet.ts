import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../Utils/Auth";
import { dbUserGet } from "../../Utils/Database/User";
import { userViewer } from "../../View";

/**
 * Controller that gets the current user based on jwt given
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function userGet(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const userToken = createUserToken(currentUser);
    const userView  = userViewer(currentUser, userToken);

    return res.status(200).json(userView);
  } catch (error) {
    return next(error);
  }
}
