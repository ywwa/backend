import { NextFunction, Request, Response } from "express";
import { createUserToken } from "../../Utils/Auth";
import { userCreatePrisma } from "../../Utils/Db/User";
import { hashPassword } from "../../Utils/hashPassword";
import { userViewer } from "../../Views";

/**
 * Users Controller that registers the user with information given in the body
 * of the request.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function userRegister(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const {
    username, email, firstName, lastName, password
  } = req.body.user;

  try {
    const hashed = hashPassword(password);

    const user = await userCreatePrisma(
      username, email, firstName, lastName, hashed
    );

    const token = createUserToken(user);

    const view = userViewer(user, token);

    return res.status(201).json(view);
  } catch (error) {
    return next(error);
  };
};

