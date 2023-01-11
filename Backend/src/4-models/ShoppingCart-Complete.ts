import { IShoppingCartModel } from "./ShoppingCart-model";
import mongoose from "mongoose";
export interface IShoppingCartCompleteModel extends mongoose.Document {
  items: mongoose.Types.ObjectId[];
  order: mongoose.Schema.Types.ObjectId;
  CartCreationDate: Date;
}

export const ShoppingCartCompleteSchema =
  new mongoose.Schema<IShoppingCartCompleteModel>(
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderModel",
      },
      CartCreationDate: { type: Date, default: new Date(), unique: false },
      items: [
        {
          type: mongoose.Types.ObjectId,
          ref: "CartItemModel",
          required: [true, "item must be provided with id"],
        },
      ],
    },
    {
      versionKey: false,
    }
  );

export const ShoppingCartCompleteModel =
  mongoose.model<IShoppingCartCompleteModel>(
    "ShoppingCartCompleteModel",
    ShoppingCartCompleteSchema,
    "cart-complete"
  );
