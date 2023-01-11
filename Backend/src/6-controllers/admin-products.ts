import { CategoryModel } from "./../4-models/category-model";
import { ProductModel, IProductModel } from "../4-models/product-model";
import fs from "fs";
import express from "express";
import { NextFunction, Request, Response } from "express";
import productsLogic from "../5-logic/products-logic";
import { webSocketServer } from "../app";

const router = express.Router();

// POST http://localhost:3001/api/admin/products
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const category = await CategoryModel.findOne({
        categoryName: request.body.category,
      }).exec();
      request.body.category = category._id;
      const product = new ProductModel(request.body);
      const addedProduct = await productsLogic.addProduct(product);

      webSocketServer.clients.forEach(function (client) {
        client.send("newProduct");
        console.log("Sent to client");
      });
      if (addedProduct && !response.headersSent)
        response.status(201).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:3001/api/products-edit/
router.post(
  "/edit",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (request.body.image !== null) {
        request.body.product.image = request.body.image;
      }
      const category = await CategoryModel.findOne({
        categoryName: request.body.product.category,
      }).exec();
      request.body.product.category = category._id;
      const updatedProduct = await productsLogic.updateProduct(
        new ProductModel(request.body.product)
      );
      webSocketServer.clients.forEach(function (client) {
        client.send("newProduct");
        console.log("Sent to client");
      });
      if (updatedProduct && !response.headersSent)
        response.status(201).json(updatedProduct);
      else if (!response.headersSent)
        response.status(401).json({ error: "could not update product" });
    } catch (err: any) {
      next(err);
    }
  }
);
export default router;
