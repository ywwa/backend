import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createUserToken } from "../../Utils/Auth";
import { userGetPrisma } from "../../Utils/Db/User";
import { userViewer } from "../../Views";

/**
 * User Controller that gets the current user based on the jwt given.
 *
 * @param req Request with an authenticated user on the auth property.
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
    const currentUser = await userGetPrisma(username);
    if ( !currentUser ) return res.sendStatus(404);

    const token = createUserToken(currentUser);

    const response = userViewer(currentUser, token);

    return res.json(response);
  }
  catch (error) {
    return next(error);
  }
}

