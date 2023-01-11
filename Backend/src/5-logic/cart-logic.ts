import {
  IShoppingCartModel,
  ShoppingCartModel,
} from "./../4-models/ShoppingCart-model";
import { CartItemModel } from "./../4-models/cartItem-model";
import { ICartItemModel } from "../4-models/cartItem-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";

/**
 *
 * @param cartItem partial item to be added to cart
 * @returns a promise containing the added model
 * @throws ValidationError if the item is invalid
 */
async function addItemToCart(
  cartItem: ICartItemModel
): Promise<ICartItemModel> {
  const errors = cartItem.validateSync();
  if (errors) throw new ValidationError(errors.message);
  return cartItem.save();
}

/**
 *
 * @param cartItem partial item to be updated
 * @returns a promise containing the updated model
 * @throws ValidationError if the item is invalid
 */
async function updateCartItem(
  cartItem: ICartItemModel
): Promise<ICartItemModel> {
  const errors = cartItem.validateSync();
  if (errors) throw new ValidationError(errors.message);

  if (cartItem.stock <= 0) {
    return await CartItemModel.findByIdAndRemove(cartItem._id).exec();
  } else {
    const updatedCartItem = await CartItemModel.findByIdAndUpdate(
      cartItem._id,
      cartItem,
      { returnOriginal: true }
    ).exec(); // { returnOriginal: false } --> return back db product and not argument product.
    return updatedCartItem;
  }
}

/**
 *
 * @param cart partial cart object to be added
 * @returns a promise containing the added model
 * @throws ValidationError if the cart is invalid
 */
async function updateCart(
  cart: IShoppingCartModel
): Promise<IShoppingCartModel> {
  const updatedCart = await ShoppingCartModel.findByIdAndUpdate(
    cart._id,
    cart,
    { returnOriginal: false }
  )
    .populate({
      path: "items",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    })
    .exec(); // { returnOriginal: false } --> return back db product and not argument product.
  if (!updatedCart) throw new IdNotFoundError(cart._id);
  return updatedCart;
}

export default {
  addItemToCart,
  updateCartItem,
  updateCart,
};
