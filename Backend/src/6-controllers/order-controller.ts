import { ShoppingCartCompleteModel } from "./../4-models/ShoppingCart-Complete";
import { ShoppingCartModel } from "./../4-models/ShoppingCart-model";
import { OrderModel } from "./../4-models/order-model";
import express, { NextFunction, Request, Response } from "express";
import orderLogic from "../5-logic/order-logic";
import authLogic from "../5-logic/auth-logic";
import { UserModel } from "../4-models/user";

const router = express.Router();

router.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orders = await orderLogic.getAllOrders((request as any).userId);
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }
);
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = await orderLogic.getOrderById(
        (request as any).userId,
        request.params.id
      );
      response.json(order);
    } catch (err: any) {
      next(err);
    }
  }
);
router.get(
  "/cart/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orderCartComplete = await orderLogic.getOrderCartById(
        request.params.id
      );
      response.json(orderCartComplete);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/order
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedOrder = await orderLogic.addOrder(request.body);

      response.status(201).json(addedOrder);
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }
);

// PUT http://localhost:3001/api/products/:_id
router.put(
  "/:_id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const order = new OrderModel(request.body);
      const updatedOrder = await orderLogic.updateOrder(order);
      response.json(updatedOrder);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
