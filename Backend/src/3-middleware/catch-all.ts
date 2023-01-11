import { NextFunction, Request, Response } from "express";

/**
 *
 * @param err error thrown from some other route
 * @param request request object
 * @param response response object
 * @param next next function
 */
function catchAll(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Get status code:
  const statusCode = err.status ? err.status : 500;

  // mongo db duplication errors
  if (err.code && err.code === 11000) {
    console.log(err.keyValue);
    response.status(400).json({
      message:
        Object.keys(err.keyValue)[0] +
        " : " +
        Object.values(err.keyValue)[0] +
        " is already taken",
    });
  }

  // Return error to frontend:
  if (!response.headersSent) response.status(statusCode).json(err.message);
}

export default catchAll;
