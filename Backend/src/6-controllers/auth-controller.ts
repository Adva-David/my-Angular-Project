import { UserModel, ValidatedRequest } from "./../4-models/user";
import express, { NextFunction, Request, Response } from "express";
import validateToken from "../3-middleware/auth-only";
import { OrderModel } from "../4-models/order-model";
import logic from "../5-logic/auth-logic";
import { ClientError } from "../4-models/client-errors";
import { ShoppingCartModel } from "../4-models/ShoppingCart-model";
const router = express.Router();

router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await logic.loginUser(
        request.body.email,
        request.body.password
      );
      const token = logic.createToken(user);
      response.status(200).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const cart = await new ShoppingCartModel({
        CartCreationDate: new Date(),
        items: [],
      }).save();
      const user = await logic.registerUser(
        new UserModel({ ...request.body, cart })
      );
      const token = logic.createToken(user);
      response.status(200).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);
router.get(
  "/",
  validateToken,
  async (request: ValidatedRequest, response: Response, next: NextFunction) => {
    try {
      const user = await logic.getUserWithOrdersAndCart(request.userId);
      response.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
