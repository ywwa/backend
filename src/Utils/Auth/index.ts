import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

/**
 * Creates a token containing user information for future authorization
 */
export default function createUserToken(
  user: User,
) {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "[utils][createUserToken:7]: JWT_SECRET is missing in the enviroment",
    );
  }

  const tokenObj = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  const json = JSON.stringify(tokenObj);
  const token = jwt.sign(json, process.env.JWT_SECRET);

  return token;
}
