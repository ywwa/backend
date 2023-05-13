import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

if ( !process.env.JWT_SECRET )
  throw new Error(
    "[middleware.auth][authenticator]: JWT_SECRET Missing in enviroment"
  );

/**
 * Receives request with possibly authorization token in headers and returns it
 * 
 * @param req Request
 * @returns token string
 */
function getTokenInHeaders(req: Request) {
  const authorization = req.headers.authorization;

  if ( !authorization ) return;
  if ( authorization.split(" ").length != 2) return;

  const [ tag,token ] = authorization.split(" ");

  if ( tag === "Toekn" || tag === "Bearer" ) return token;
  return;
}

export const authenticate = jwt({
  algorithms: ["HS256"],
  secret    : process.env.JWT_SECRET,
  getToken  : getTokenInHeaders
});

export const optionalAuthenticate = jwt({
  algorithms: ["HS256"],
  secret    : process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken  : getTokenInHeaders
});

