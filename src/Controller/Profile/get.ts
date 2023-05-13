import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Util/Database/User";
import { profileViewer } from "../../View";

/**
 * Controller that takes username in parameters and returns its profile
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function get(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { username } = req.params;

  try {
    const profile = await dbUserGet(username);
    if ( !profile ) return res.sendStatus(404);

    const view = profileViewer(profile);

    return res.json({ profile: view });
  } catch (error) {
    return next(error);
  };
}

