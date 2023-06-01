import { NextFunction, Request, Response } from "express";
import { dbUserGet } from "../../Utils/Database/User";
import { passwordCompare } from "../../Utils/hashpswd";
import createUserToken from "../../Utils/Auth";
import { userViewer } from "../../View";
export default async function fnUsersLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body.user;

  try {
    const requestedUser = await dbUserGet(username);
    if (!requestedUser) {
      return res.sendStatus(404);
    }

    if (!passwordCompare(password, requestedUser.password)) {
      return res.sendStatus(403);
    }

    const userToken = createUserToken(requestedUser);
    const userView = userViewer(requestedUser, userToken);

    return res.json(userView);
  } catch (error) {
    return next(error);
  }
}
