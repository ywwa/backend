import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import createUserToken from "../../Utils/Auth";
import { userViewer } from "../../View";

export default async function fnUserGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(404);
    }

    const userToken = createUserToken(authenticatedUser);
    const userView = userViewer(authenticatedUser, userToken);

    return res.json(userView);
  } catch (error) {
    return next(error);
  }
}
