import { UserModel } from "./../4-models/user";
import mongoose from "mongoose";
import { CartItemModel } from "./../4-models/cartItem-model";
import { ShoppingCartModel } from "./../4-models/ShoppingCart-model";
import { LoginComponent } from "../../../Frontend/src/app/auth/feature/login/login.component";
import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";
import cartLogic from "../5-logic/cart-logic";
import { AuthenticatedRequest } from "../app";

const router = express.Router();

// POST http://localhost:3001/api/cart
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { product, stock } = request.body;
      // { product, cart: this.cart$.value }
      let cart = request.body.cart;
      // create a a cart
      if (!cart) {
        cart = await new ShoppingCartModel({
          CartCreationDate: new Date(),
          items: [],
        }).save();
        await UserModel.findByIdAndUpdate((request as any).userId, {
          cart: cart._id,
        }).exec();
      }
      const cartItem = new CartItemModel({
        stock,
        cart: cart._id,
        product: product._id,
      });
      const addedProduct = await cartLogic.addItemToCart(cartItem);
      cart.items.push(addedProduct._id);
      const updatedCart = await cartLogic.updateCart(cart);
      response.status(201).json(updatedCart);
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }
);

// PUT http://localhost:3001/api/products/:_id
router.put(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await cartLogic.updateCartItem(
        new CartItemModel({
          ...request.body,
          product: request.body.product._id,
        })
      );
      response.json(request.body.product);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
