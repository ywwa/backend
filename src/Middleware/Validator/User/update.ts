import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Util/Types";

/**
 * Middleware that validates the user information in the request in order to
 * update the user.
 *
 * if ( not well formed ) => returns, stopping the flow of the express.
 * if (   well formed   ) => passes the control to the next handler.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default function validator(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const errors: ValidationError = {};
  errors.body = [];
  
  if ( !req.body ) {
    errors.body.push("request body can not be empty");
    return res.status(400).json({ errors });
  };

  const { user } = req.body;
  if ( !user ) {
    errors.body.push("user object must be defined");
    return res.status(400).json({ errors });
  };

  if ( typeof user != "object" ) {
    errors.body.push("user must be an object");
    return res.status(400).json({ errors });
  };

  const opt_fields = [
    "username", "email", "firstName", "lastName", "password", "image"
  ];
  for ( const key of Object.keys(user) ) {
    if ( typeof key != "string" && key in opt_fields ) {
      errors.body.push(`${key} must be a string`);
    };

    if ( !opt_fields.includes(key) ) {
      errors.body.push(`${key} is not one of fields accepted`);
    };
  };

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
};

