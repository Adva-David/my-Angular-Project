import mongoose from "mongoose";

export interface IShoppingCartModel extends mongoose.Document {
  CartCreationDate: Date;
  items: mongoose.Types.ObjectId[];
}

export const ShoppingCartSchema = new mongoose.Schema<IShoppingCartModel>(
  {
    CartCreationDate: {
      type: Date,
      required: [true, "Missing creation date"],
      minlength: [3, "date too short"],
      maxlength: [100, "date too long"],
      trim: true,
      unique: false,
      default: new Date(),
    },
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

export const ShoppingCartModel = mongoose.model<IShoppingCartModel>(
  "ShoppingCartModel",
  ShoppingCartSchema,
  "cart"
);
