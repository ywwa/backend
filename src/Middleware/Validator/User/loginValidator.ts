import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../../Utils/Types";

/**
 * Middleware that validates the user information in the request in order to
 * log the user.
 *
 * if !wellformed => returns, stopping the flow of the express.
 * else => passes the control to the next handler.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function loginValidator(
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

  const { username, password } = req.body.user;
  const requiredChecks = { username, password };

  for (const [field, content] of Object.entries(requiredChecks)) {
    if (typeof content != "string" || content.length == 0) {
      errors.body.push(`${field} must be a non-empty string`);
    }
  }

  if (errors.body.length) return res.status(400).json({ errors });
  next();
}
