import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Util/Types";

/**
 * Middleware the validates the user information in the request in order to log
 * the user.
 * if ( not well formed ) => returns, stopping the fow of the express.
 * if ( well formed ) => passes control to the next handler.
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

  const { user } = req.body;
  if ( !user ) {
    errors.body.push("User object must be defined");
    return res.status(400).json({ errors });
  };

  const { username, email, firstName, lastName, password } = user;

  // username
  if ( !username ) {
    errors.body.push("username property can not be empty");
  }
  else if ( typeof username != "string" ) {
    errors.body.push("username property must be a string");
  };

  // email
  if ( !email ) {
    errors.body.push("email property can not be empty");
  }
  else if ( typeof email != "string" ) {
    errors.body.push("email property must be a string");
  };
  
  // firstName
  if ( !firstName ) {
    errors.body.push("firstName property can not be empty");
  }
  else if ( typeof firstName != "string" ) {
    errors.body.push("firstName property must be a string");
  };

  // lastName
  if ( !lastName ) {
    errors.body.push("lastName property can not be empty");
  }
  else if ( typeof lastName != "string" ) {
    errors.body.push("lastName property must be a string");
  };

  // password
  if ( !password ) {
    errors.body.push("password property can not be empty");
  }
  else if ( typeof password != "string" ) {
    errors.body.push("password property must be a string");
  }
  else if ( !(password.length > 8) ) {
    errors.body.push("password property must be at least 8 characters long");
  };

  if ( errors.body.length ) return res.status(400).json({ errors });
  next();
} 
 
