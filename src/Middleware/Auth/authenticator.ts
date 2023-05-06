import * as dotenv from "dotenv";
import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

dotenv.config();

if ( !process.env.JWT_SECRET ) {
  throw new Error(
    "[middleware.auth][authenticator]: Missing JWT_SECRT in enviroment"
  );
};

/**
 * Function that receives a request with possibly an authorization token in the
 * headers and returns this token.
 * 
 * @param req Request
 * @returns the token or undefined
 */
function getTokenInHeaders(req: Request) {
  const authorization = req.headers.authorization;
  if ( !authorization ) return;
  if ( authorization.split(" ").length != 2 ) return;
  const [ tag, token ] = authorization.split(" ");

  if ( tag === "Token" || tag === "Bearer" ) return token;
  return;
}

export const authenticate = jwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: getTokenInHeaders
});

export const optionalAuthenticate = jwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: getTokenInHeaders
});

