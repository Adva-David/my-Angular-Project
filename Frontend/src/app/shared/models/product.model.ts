import { Category } from './category.mode';

export type Product = {
  _id: string;
  productName: string;
  price: number;
  image: string;
  category: Category;
};

export type ProductForm = {
  _id: string;
  productName: string;
  price: number | string;
  image: string;
  category: string;
};
