import { NextFunction, Request, Response } from "express";
import logger from "../../Utils/logger";

/** Middleware for handling general errors not handled by other middlewares.
 *
 * @param err Error
 * @param _req Request
 * @param res Response
 * @param _next NextFunction
 */
export default function generalErrorHandler(
  err  : Error,
  _req : Request,
  res  : Response,
  _next: NextFunction
) {
  logger.error(`Unhandled error in generalErrorHandler`);
  logger.error(`${err.message}\n${err.name}\n${err.stack}`);
  return res.sendStatus(500);
}
 
