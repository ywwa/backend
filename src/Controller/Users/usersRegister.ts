import { NextFunction, Request, Response } from "express";
import createUserToken from "../../Utils/Auth";
import { dbUserCreate } from "../../Utils/Database/User";
import { passwordHash } from "../../Utils/hashpswd";
import { userViewer } from "../../View";

interface User {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
};

/**
 * User registration controller.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function usersRegister(
  req : Request,
  res : Response,
  next: NextFunction
) {

  const {
    username,
    email,
    firstName,
    lastName,
    password
  }: User = req.body.user;

  try {
    const hashedPassword: string = passwordHash(password);
    const hashedUser: User = {
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword
    };
    
    const newUser = await dbUserCreate(hashedUser);
    const userToken = createUserToken(newUser);
    const userView  = userViewer(newUser, userToken);

    return res.status(201).json(userView);
  } catch (error) {
    return next(error)
  }
}
