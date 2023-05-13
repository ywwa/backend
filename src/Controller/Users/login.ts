import { NextFunction, Request, Response } from "express";
import { createUserToken } from "../../Util/Auth";
import { dbUserGet } from "../../Util/Database/User";
import { passwordCompare } from "../../Util/hashpswd";
import { userViewer } from "../../View";

/**
 * User Login Controller.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function login(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { username, password } = req.body.user;

  try {
    const user = await dbUserGet(username);
    if ( !user ) return res.sendStatus(404);

    if ( !passwordCompare(password, user.password) )
      return res.sendStatus(403);

    const token = createUserToken(user);
    const view  = userViewer(user, token);

    return res.json(view);
  } catch (error) {
    return next(error);
  };
};

