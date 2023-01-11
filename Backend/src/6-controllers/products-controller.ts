import { LoginComponent } from "../../../Frontend/src/app/auth/feature/login/login.component";
import express, { NextFunction, Request, Response } from "express";
import { ProductModel } from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// GET http://localhost:3001/api/products
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productsLogic.getAllProducts();
      response.status(200).json(products);
    } catch (err: any) {
      next(err);
    }
  }
);
// GET http://localhost:3001/api/products/categories
router.get(
  "/categories",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productsLogic.getAllCategories();
      response.status(200).json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
