import mongoose from "mongoose";

export interface ICartItemModel extends mongoose.Document {
  stock: number;
  currentPayment: number;
  product: mongoose.Types.ObjectId;
}

export const CartItemScheme = new mongoose.Schema<ICartItemModel>(
  {
    stock: {
      type: Number,
      required: [true, "Missing stock"],
      min: [0, "Stock can't be negative"],
      max: [1000, "Stock can't exceed 1000"],
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "ProductModel",
      required: [true, "product my be provided with id"],
    } as any,
  },
  {
    versionKey: false,
  }
);

export const CartItemModel = mongoose.model<ICartItemModel>(
  "CartItemModel",
  CartItemScheme,
  "cart_product"
);
