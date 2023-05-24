import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the user information in the request in order to
 * update user.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default function updateValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors: ValidationError = {};
  errors.body = [];

  if (!req.body) {
    errors.body.push("Request body can not be empty");
    return res.status(400).json({ errors });
  }

  if (!req.body.user && typeof req.body.user != "object") {
    errors.body.push("User must be an object inside body");
    return res.status(400).json({ errors });
  }

  const opt_fields = [
    "username",
    "email",
    "firstName",
    "lastName",
    "password",
    "image",
  ];
  for (const key of Object.keys(req.body.user)) {
    if (typeof key != "string" && key in opt_fields) {
      errors.body.push(`${key} must be a string`);
    }

    if (!opt_fields.includes(key)) {
      errors.body.push(`${key} is not one of the accepted fields`);
    }
  }

  if (req.body.user.password && !(req.body.user.password.length >= 8)) {
    errors.body.push("password must be at least 8 characters long");
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}
