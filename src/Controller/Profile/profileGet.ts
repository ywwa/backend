import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../Utils/Database/User";
import { profileViewer } from "../../View";

export default async function fnProfileGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username } = req.params;
  try {
    const requestedProfile = await dbUserGet(username);
    if (!requestedProfile) {
      return res.sendStatus(404);
    }

    const profileView = profileViewer(requestedProfile);

    return res.json({ profile: profileView });
  } catch (error) {
    return next(error);
  }
}
