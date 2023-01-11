import { CartComplete, CartCompleteWithProduct } from './cart.model';
import { User } from './user.mode';

export type Order = {
  _id?: string;
  totalPrice: number;
  deliveryCity: string;
  deliveryStreet: string;
  deliveryDate: Date;
  orderDate: Date;
  cart: string;
  user: string;
};

export type OrderWithCart = Order & {
  cart: CartComplete;
};
export type OrderWithCartComplete = OrderWithCart & {
  cart: CartCompleteWithProduct;
};
