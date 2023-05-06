import { NextFunction, Request, Response } from "express";
import { createUserToken } from "../../Utils/Auth";
import { userGetPrisma } from "../../Utils/Db/User";
import { compareWithHash } from "../../Utils/hashPassword";
import { userViewer } from "../../Views";

/**
 * Users Controller for the login function sending a valid jwt token in the
 * body of the request.
 *
 * @param req Request body property containing json with user properties.
 * @param res Response 
 * @param next NextFunction
 */
export default async function userLogin(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { username, password } = req.body.user;

  try {
    const user = await userGetPrisma(username);
    if ( !user ) return res.sendStatus(404);

    if ( !compareWithHash(password, user.password) ) return res.sendStatus(403);

    const token = createUserToken(user);

    const view = userViewer(user, token);

    return res.json(view);
  } catch (error) {
    return next(error);
  };
};

