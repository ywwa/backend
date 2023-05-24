import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the group information in the request in order to
 * create the group.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function createValidator(
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

  if ( !req.body.group && typeof req.body.group != "object" ) {
    errors.body.push("Group must be an object inside body");
    return res.status(400).json({ errors });
  }

  const { name, description } = req.body.group;
  const requiredChecks = { name, description };

  for ( const [field, content] of Object.entries(requiredChecks) ) {
    if ( typeof content != "string" || content.length == 0 ) {
      errors.body.push(`${field} must be an non-empty string`);
    }
  }

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
}
