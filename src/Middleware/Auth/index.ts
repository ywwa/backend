import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

if ( !process.env.JWT_SECRET ) {
  throw new Error(
    "[middleware.auth:4]: JWT_SECRET Missing in the enviroment"
  );
}

/**
 * Receives request with possibly authorization token in headers & returns it
 *
 * @param req Request
 * @returns token string
 */
function getTokenInHeaders( req: Request ) {
  const authorization = req.headers.authorization;

  if ( !authorization ) return;
  if ( authorization.split(" ").length != 2 ) return;

  const [ tag, token ] = authorization.split(" ");

  if ( tag === "Token" || tag === "Bearer" ) return token;
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
