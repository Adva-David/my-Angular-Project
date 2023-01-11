import mongoose from "mongoose";
import { ClientError } from "./client-errors";

export interface IOrderModel extends mongoose.Document {
  totalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: Date;
  orderDate: Date;
  cart: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>(
  {
    totalPrice: {
      type: Number,
      required: [true, "Missing total price"],
    },
    deliveryCity: {
      type: String,
      required: [true, "Missing city"],
    },
    deliveryStreet: {
      type: String,
      required: [true, " Missing street"],
    },
    deliveryDate: {
      type: Date,
      required: [true, " Missing delivery date"],
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "ShoppingCartCompleteModel",
      required: [true, "cart must be provided"],
    } as any,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: [true, "user must be provided"],
    } as any,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

/**
 * pre-order save validation
 * validates order date by checking the dates
 * max 3 orders are accepted per date
 */
OrderSchema.pre("save", async function (next, done) {
  // do stuff

  const orderDate = this.deliveryDate.toISOString().split("T")[0];
  const existingOrders = await OrderModel.find({}).exec(); // 2023-01-29
  let i = 0;
  existingOrders.forEach((o) => {
    const dateString = o.deliveryDate.toISOString().split("T")[0];
    if (dateString === orderDate) i++;
  });
  if (i < 3) {
    next();
  } else {
    next(
      new ClientError(
        400,
        `There are not available deliveries for this date ${orderDate}`
      )
    );
  }
});

export const OrderModel = mongoose.model<IOrderModel>(
  "OrderModel",
  OrderSchema,
  "order"
);
