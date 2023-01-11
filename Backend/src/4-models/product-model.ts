import mongoose from "mongoose";
import { CategoryModel } from "./category-model";

export interface IProductModel extends mongoose.Document {
  productName: string;
  price: number;
  image: string;
  category: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = new mongoose.Schema<IProductModel>(
  {
    productName: {
      type: String,
      required: [true, "Missing product name"],
      minlength: [3, "Name too short"],
      maxlength: [100, "Name too long"],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Product my have image"],
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "price can't be negative"],
      max: [1000, "price can't exceed 1000"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "category must be provided with id"],
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

export const ProductModel = mongoose.model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "product"
);
