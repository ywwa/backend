import { NextFunction, Request, Response } from "express";
import { createUserToken } from "../../Util/Auth";
import { dbUserCreate } from "../../Util/Database/User";
import { passwordHash } from "../../Util/hashpswd";
import { userViewer } from "../../View";

/**
 * User Registration controller.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function register(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const {
    username, email, firstName, lastName, password
  } = req.body.user;

  try {
    const hashedPassword = passwordHash(password);

    const user = await dbUserCreate(
      username, email, firstName, lastName, hashedPassword
    );

    const token = createUserToken(user);
    const view = userViewer(user, token);

    return res.status(201).json(view);
  } catch (error) {
    return next(error)
  };
};

