import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { passwordHash } from "../../Utils/hashpswd";
import { dbUserUpdate } from "../../Utils/Database/User";
import createUserToken from "../../Utils/Auth";
import { userViewer } from "../../View";

export default async function fnUserUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const data = req.body.user;

  if (data.password) {
    data.password = passwordHash(data.password);
  }

  try {
    const updatedUser = await dbUserUpdate(username, data);
    if ( !updatedUser ) {
      return res.status(404);
    }

    const userToken = createUserToken(updatedUser);
    const userView = userViewer(updatedUser, userToken);
    
    return res.status(201).json(userView);
  } catch (error) {
    return next(error);
  }
}
