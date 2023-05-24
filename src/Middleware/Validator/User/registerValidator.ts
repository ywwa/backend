import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the user information in the request in order to
 * register the user.
 * if !wellformed => returns, stopping the flow of the express.
 * else => passes the control to the tnext handler
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function registerValidator(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const errors: ValidationError = {};
  errors.body = [];

  if ( !req.body ) {
    errors.body.push("Request body can not be empty");
    return res.status(400).json({ errors });
  }

  if ( !req.body.user && typeof req.body.user != "object" ) {
    errors.body.push("User must be an object inside body");
    return res.status(400).json({ errors });
  }

  const { username, email, firstName, lastName, password } = req.body.user;
  const requiredChecks = { username, email, firstName, lastName, password };

  for ( const [field, content] of Object.entries(requiredChecks) ) {
    if ( typeof content != "string" || content.length == 0 ) {
      errors.body.push(`${field} must be an non-empty string`);
    }
  }
  // TODO: MAKE PASSWORD_LENGTH GLOBAL VARIABLE TO DETERMINATE HOW LONG
  // PASSWORD SHOULD BE
  if ( !(password.length >= 8) ) {
    errors.body.push("password must be at least 8 characters long");
  }

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
}
 
