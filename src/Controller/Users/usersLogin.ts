import { NextFunction, Request, Response } from "express";
import createUserToken from "../../Utils/Auth";
import { dbUserGet } from "../../Utils/Database/User";
import { passwordCompare } from "../../Utils/hashpswd";
import { userViewer } from "../../View";

/**
 * User login controller.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function usersLogin(
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

    const userToken = createUserToken(user);
    const userView  = userViewer(user, userToken);

    return res.status(200).json(userView);

  } catch (error) {
    return next(error);
  }
}
