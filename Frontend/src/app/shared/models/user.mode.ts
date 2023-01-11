import { Cart } from './cart.model';
import { Order } from './order.model';

export const DefaultUserObject: User = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passportId: '',
  city: '',
  street: '',
  admin: false,
  cart: undefined,
  orders: [],
};

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passportId: string;
  city: string;
  street: string;
  admin: boolean;
  cart: Cart;
  orders: Order[];
};
