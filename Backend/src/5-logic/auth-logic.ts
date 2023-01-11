import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IUserModel, UserModel } from "./../4-models/user";
import { OrderModel } from "../4-models/order-model";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PopulateOptions } from "mongoose";

dotenv.config();

const cartPopulateOptions: PopulateOptions = {
  path: "cart",
  populate: {
    path: "items",
    populate: {
      path: "product",
      populate: {
        path: "category",
      },
    },
  },
};

/**
 *
 * @param user a partial user object to be registered
 * @returns a promise containing the saved user model
 */
async function registerUser(user: IUserModel): Promise<IUserModel> {
  const errors = user.validateSync();
  if (errors) throw new ValidationError(errors.message);
  var shasum = crypto.createHash("sha1");
  shasum.update(user.password);
  const encrypted = shasum.digest("hex");
  user.password = encrypted;
  return user.save();
}

/**
 * creates a token based on uid
 * @param user a partial user object
 * @returns a signed token containing user id
 */
function createToken(user: IUserModel) {
  const token = jwt.sign({ _id: String(user._id) }, process.env.PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
}

/**
 *
 * @param email user email
 * @param password user pre-encrypted password
 * @returns a promise containing the logged in user object
 * @throws ValidationError if the user credentials aren't valid
 */
async function loginUser(email: string, password: string): Promise<IUserModel> {
  const user = await UserModel.findOne({ email }).populate("cart").exec();
  if (!user) throw new ValidationError("User not found");
  var shasum = crypto.createHash("sha1");
  shasum.update(password);
  const encrypted = shasum.digest("hex");
  if (encrypted !== user.password) {
    throw new ValidationError("Wrong password");
  }
  return user;
}

/**
 *
 * @param id user id
 * @returns user object with orders populated
 */
async function getUserWithOrders(id: string): Promise<IUserModel> {
  const user = await UserModel.findById(id).populate("orders").exec();
  if (!user) throw new ValidationError("User not found");
  return user;
}

/**
 *
 * @param id user id
 * @returns user object with cart populated
 */
async function getUserWithCart(id: string): Promise<IUserModel> {
  const user = await UserModel.findById(id)
    .populate(cartPopulateOptions)
    .exec();
  if (!user) throw new ValidationError("User not found");
  return user;
}
/**
 *
 * @param id user id
 * @returns user object with both cart and orders populated
 */
async function getUserWithOrdersAndCart(id: string): Promise<IUserModel> {
  const user = await UserModel.findById(id)
    .populate("orders")
    .populate(cartPopulateOptions)
    .exec();
  if (!user) throw new ValidationError("User not found");
  return user;
}

/**
 *
 * @param id user id
 * @returns user object without any populations
 */
async function getUser(id: string): Promise<IUserModel> {
  const user = await UserModel.findById(id).exec();
  if (!user) throw new ValidationError("User not found");
  return user;
}
export default {
  registerUser,
  loginUser,
  createToken,
  getUserWithOrders,
  getUserWithOrdersAndCart,
  getUserWithCart,
  getUser,
};
