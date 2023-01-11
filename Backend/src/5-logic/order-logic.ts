import { ShoppingCartModel } from "./../4-models/ShoppingCart-model";
import { IOrderModel, OrderModel } from "./../4-models/order-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import {
  IShoppingCartCompleteModel,
  ShoppingCartCompleteModel,
} from "../4-models/ShoppingCart-Complete";
import { UserModel } from "../4-models/user";

/**
 *
 * @param userId user's id
 * @returns a promise containing the given user's orders
 */
async function getAllOrders(userId: string): Promise<IOrderModel[]> {
  // Return all products with the specified virtual fields:
  return OrderModel.find({ userId }).exec();
}

/**
 *
 * @param userId user id
 * @param orderId  order id
 * @returns a promise containing a single order corresponding to given id
 */
async function getOrderById(
  userId: string,
  orderId: string
): Promise<IOrderModel> {
  // Return all products with the specified virtual fields:
  return OrderModel.findOne({ userId, _id: orderId })
    .populate({
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
    })
    .exec();
}

/**
 *
 * @param orderId order id
 * @returns a cart object by order id
 */
async function getOrderCartById(
  orderId: string
): Promise<IShoppingCartCompleteModel> {
  // Return all products with the specified virtual fields:
  return ShoppingCartCompleteModel.findOne({ order: orderId })
    .populate({
      path: "items",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    })
    .exec();
}

/**
 *
 * @param orderData a order partial to be added
 * @returns a promise containing the added order model
 * @throws ValidationError if order data is invalid
 */
async function addOrder(orderData: IOrderModel): Promise<IOrderModel> {
  const order = new OrderModel(orderData);
  const errors = order.validateSync();
  if (errors) {
    throw new ValidationError(errors.message);
  }
  // create a complete-cart
  const oldCart = await ShoppingCartModel.findById(order.cart._id).exec();
  const newCartObject = { ...order.cart };
  delete newCartObject["_id"];
  const creationDate = new Date();
  creationDate.setTime(creationDate.getTime() + 60 * 1000);
  const completeCartModel = new ShoppingCartCompleteModel({
    CartCreationDate: creationDate,
    items: oldCart.items,
  });
  const completeCart = await completeCartModel.save();
  order.cart = completeCart._id;
  // add order
  const newOrder = await order.save();
  await UserModel.findByIdAndUpdate(order.user._id, {
    cart: undefined,
  }).exec();
  // remove old cart
  await oldCart.remove();
  await completeCartModel.update({ order: newOrder._id });
  return newOrder;
}

/**
 *
 * @param orderData a order partial to be updated
 * @returns a promise containing the updated order model
 * @throws ValidationError if order data is invalid
 */
async function updateOrder(order: IOrderModel): Promise<IOrderModel> {
  const errors = order.validateSync();
  if (errors) throw new ValidationError(errors.message);
  const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, order, {
    returnOriginal: false,
  }).exec(); // { returnOriginal: false } --> return back db product and not argument product.
  if (!updatedOrder) throw new IdNotFoundError(order._id);
  return updatedOrder;
}

export default {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  getOrderCartById,
};
