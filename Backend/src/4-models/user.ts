import mongoose from "mongoose";
import { Request } from "express";
export type ValidatedRequest = Request & { userId?: any };

// 1. Model interface - describing the data:
export interface IUserModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passportId: string;
  city: string;
  street: string;
  admin: boolean;
  cart: mongoose.Types.ObjectId;
  orders: mongoose.Types.ObjectId[];
}

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// 2. Model schema - describing validation, data, constraints...
export const UserScheme = new mongoose.Schema<IUserModel>(
  {
    firstName: {
      type: String, // JavaScript String
      required: [true, "Missing first name"],
      minlength: [2, "Name too short"],
      maxlength: [100, "Name to long"],
      trim: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    lastName: {
      type: String, // JavaScript String
      required: [true, "Missing last name"],
      minlength: [2, "Name too short"],
      maxlength: [100, "Name to long"],
      trim: true,
    },
    passportId: {
      type: String, // JavaScript String
      required: [true, "Missing passport id"],
      minlength: [9, "passport id too short"],
      maxlength: [9, "passport id to long"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true as any,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ] as any,
    } as any,
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "ShoppingCartModel",
      default: undefined,
      required: [false, "Cart object must be provided with id"],
    } as any,
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "OrderModel",
        required: [true, "Cart object must be provided with id"],
      },
    ],
  },
  {
    // Options
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

// 3. Model Class - the final model class:
export const UserModel = mongoose.model<IUserModel>(
  "UserModel",
  UserScheme,
  "user"
);
