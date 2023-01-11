import { CartProduct, CartProductWithProduct } from './cart-product.model';

export type Cart = {
  _id: string;
  CartCreationDate: Date;
  items: CartProductWithProduct[];
};
export type CartComplete = {
  _id: string;
  items: CartProduct[];
};
export type CartCompleteWithProduct = {
  _id: string;
  items: CartProductWithProduct[];
};
