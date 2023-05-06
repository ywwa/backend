import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

/**
 * Creates a token containing user information for future authorization.
 *
 * @param user User information to create token.
 * @returns the token created
 */
export default function createUserToken(
  user: User
) {
  if ( !process.env.JWT_SECRET ) {
    throw new Error(
      "[utils.auth][createUserToken]: JWT_SECRET MISSING IN ENVIROMENT"
    );
  };

  const tokenObject = {
    user: {
      id       : user.id,
      username : user.username,
      email    : user.email,
      firstName: user.firstName,
      lastName : user.lastName,
      role     : user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  };
  const userJson = JSON.stringify(tokenObject);
  const token    = jwt.sign(userJson, process.env.JWT_SECRET);

  return token;
};

