import { NextFunction, Request, Response } from "express";
import { passwordHash } from "../../Utils/hashpswd";
import { dbUserCreate } from "../../Utils/Database/User";
import createUserToken from "../../Utils/Auth";
import { userViewer } from "../../View";

interface NewUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default async function fnUsersRegister(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    username,
    email,
    firstName,
    lastName,
    password,
  }: NewUser = req.body.user;

  try {
    const hashedPassword: string = passwordHash(password);
    const hashedNewUser: NewUser = {
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    };

    const newUser = await dbUserCreate(hashedNewUser);
    const userToken = createUserToken(newUser);
    const userView = userViewer(newUser, userToken);

    return res.status(201).json(userView);
  } catch (error) {
    return next(error);
  }
}
