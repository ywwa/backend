import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { createUserToken } from "../../Utils/Auth";
import { userUpdatePrisma } from "../../Utils/Db/User";
import { userViewer } from "../../Views";

/**
 * User Controller that updates the current user with information given in the
 * body of the request.
 *
 * @param req Request with authenticated user in the auth property and new 
 * information in the body of the request.
 * @param res Response
 * @param next NextFunction
 */
export default async function userUpdate(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;
  const data     = req.body.user;

  try {
    const updatedUser = await userUpdatePrisma(username, data);
    if ( !updatedUser ) return res.sendStatus(404);

    const token = createUserToken(updatedUser);

    const userView = userViewer(updatedUser, token);

    return res.json(userView);
  } catch (error) {
    return next(error);
  };
};

