import { UserModel } from "./../4-models/user";
import { NextFunction, Request, Response } from "express";
import validateToken from "./auth-only";
import { ValidationError } from "../4-models/client-errors";

async function validateAdmin(
  request: Request & { userId?: any },
  response: Response,
  next: NextFunction
) {
  // validate the auth token
  validateToken(request, response, next);
  // if the token is valid
  // userId will be provided in request object
  if (request.userId) {
    const user = await UserModel.findById(request.userId).exec();
    if (!user.admin)
      throw new ValidationError("User is not allowed to reach this resource");
    next();
  }
}

export default validateAdmin;
