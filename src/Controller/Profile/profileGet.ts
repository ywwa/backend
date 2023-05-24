import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import { profileViewer } from "../../View";

/**
 * Profile controller that takes username in parameters and returns its profile
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function profileGet(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { username } = req.params;

  try {
    const profile = await dbUserGet(username);
    if ( !profile ) return res.sendStatus(404);

    const profileView = profileViewer(profile, true);

    return res.json({ profile: profileView })
  } catch (error) {
    return next(error);
  }
}
