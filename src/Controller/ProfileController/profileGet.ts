import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { userGetPrisma } from "../../Utils/Db/User";
import profileViewer from "../../Views/profileViewer";

/**
 * Profile Controller takes username in parameters and returns its profile.
 *
 * @param req Request with optional authenticated user.
 * @param res Response
 * @param next NextFunction
 */
export default async function profileGet(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { username } = req.params;
  const currentUsername = req.auth?.user?.username;

  try {
    const currentUser = await userGetPrisma(currentUsername);

    const profile = await userGetPrisma(username);
    if ( !profile ) return res.sendStatus(404);

    const profileView = currentUser
      ? profileViewer(profile, currentUser)
      : profileViewer(profile);

    return res.json({ profile: profileView });
  } catch (error) {
    return next(error);
  };
}

