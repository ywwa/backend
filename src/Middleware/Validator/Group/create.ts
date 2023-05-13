import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ValidationError } from "../../../Util/Types";

/**
 * Middleware that validates information for group creating controller
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function validator(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const errors: ValidationError = {};
  errors.body = [];

  if ( !req.body ) {
    errors.body.push("Request body can not be empty");
    return res.status(400).json({ errors });
  };

  if ( !req.body.group && typeof req.body.group != "object" ) {
    errors.body.push("group must be an object inside body");
    return res.status(400).json({ errors });
  };

  const { name, description } = req.body.group;
  const requiredChecks = { name, description };

  for ( const [variable, content] of Object.entries(requiredChecks) ) {
    if ( typeof content != "string" || content.length == 0 ) {
      errors.body.push(`${variable} must be an non-empty string`);
    }
  }
  
  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
}
