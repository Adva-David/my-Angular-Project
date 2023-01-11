import { ValidatedRequest } from "./../4-models/user";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ValidationError } from "../4-models/client-errors";
dotenv.config();

/**
 *
 * @param request a validated request object
 * @param response response
 * @param next  next function
 * @returns error response if token is invalid
 */
function validateToken(
  request: ValidatedRequest,
  response: Response,
  next: NextFunction
) {
  if (request.headers["authorization"]) {
    let token = request.headers["authorization"].split("Bearer ")[1]; // token
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      request.userId = decoded;
      // token valid proceed to API
      next();
    } catch (e) {
      // bad token not proceeding to api
      return response.status(401).json(new ValidationError("invalid token"));
    }
  }
}

export default validateToken;
