import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the user information in the request in order to
 * log the user.
 *
 * if ( not well formed ) => returns, stopping the flow of the express.
 * if (   well formed   ) => passes control to the next handler.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function userLoginValidator(
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

  const { username, password } = user;

  // username
  if ( !username ) {
    errors.body.push("username property can not be empty");
  }
  else if ( typeof username != "string" ) {
    errors.body.push("username property must be a string");
  };

  // password
  if ( !password ) {
    errors.body.push("password property can not be empty");
  }
  else if ( typeof password != "string" ) {
    errors.body.push("password property must be a string"); 
  };

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
}

