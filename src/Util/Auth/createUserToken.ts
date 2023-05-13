import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

/**
 * Creates a token containing user information for future authorization.
 *
 * @param user User information to create token
 * 
 * @returns the token created
 */
export default function createUserToken(
  user: User
) {
  if ( !process.env.JWT_SECRET ) {
    throw new Error(
      "[util.auth][createUserToken]: JWT_SECRET missing in enviroment"
    );
  };

  const tokenObj = {
    user: {
      id        : user.id,
      username  : user.username,
      email     : user.email,
      firstName : user.firstName,
      lastName  : user.lastName,
      role      : user.role,
      createdAt : user.createdAt,
      updatedAt : user.updatedAt
    }
  };

  const json = JSON.stringify(tokenObj);
  const token = jwt.sign(json, process.env.JWT_SECRET);
  return token;
};

