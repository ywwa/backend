import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the group information in the request in order to
 * update the group.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function updateValidator(
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

  const opt_fields = [ "name", "description" ];

  for ( const key of Object.keys(req.body.group) ) {
    if ( typeof key != "string" && key in opt_fields )
      errors.body.push(`${key} must be a string`);

    if ( !opt_fields.includes(key) )
      errors.body.push(`${key} is not one of the accepted fields`);
  }

  

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
}
