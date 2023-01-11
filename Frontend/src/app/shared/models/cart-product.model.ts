import { Product } from './product.model';

export type CartProduct = {
  stock: number;
  currentPayment: number;
  product: string;
};
export type CartProductWithProduct = CartProduct & {
  product: Product;
};
