import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../Utils/Auth";
import { dbUserUpdate } from "../../Utils/Database/User";
import { userViewer } from "../../View";
import { passwordHash } from "../../Utils/hashpswd";


/**
 * Controller that updates the current user with information given in the body
 * of hte request
 * 
 * @param req Request with authenticated user in the auth property and
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
  data.password  = passwordHash(data.password);

  try {
    const updatedUser = await dbUserUpdate(username, data);
    if ( !updatedUser ) return res.status(404);

    const userToken = createUserToken(updatedUser);
    const userView  = userViewer(updatedUser, userToken);

    return res.status(200).json(userView);
  } catch (error) {
    return next(error);
  }
}
