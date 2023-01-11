import { CategoryModel, ICategoryModel } from "./../4-models/category-model";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import { IProductModel, ProductModel } from "../4-models/product-model";

/**
 *
 * @returns a promise containing all the app's products
 */
async function getAllProducts(): Promise<IProductModel[]> {
  // Return all products with the specified virtual fields:
  return ProductModel.find().populate("category").exec();
  //   return ProductModel.find();
}

/**
 *
 * @returns a promise containing all the app's product categories
 */
async function getAllCategories(): Promise<ICategoryModel[]> {
  // Return all products with the specified virtual fields:
  return CategoryModel.find().exec();
  //   return ProductModel.find();
}

/**
 *
 * @param product a product to be added to the app's product store
 * @returns a promise containing the added model
 * @throws ValidationError if the model is invalid
 */
async function addProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ValidationError(errors.message);
  return product.save();
}

/**
 *
 * @param product a product to be updated
 * @returns a promise containing the updateed model
 * @throws ValidationError if the model is invalid
 */
async function updateProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  console.log(product);
  if (errors) throw new ValidationError(errors.message);
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product._id,
    product,
    { returnOriginal: false }
  ).exec(); // { returnOriginal: false } --> return back db product and not argument product.
  return updatedProduct;
}

export default {
  getAllProducts,
  addProduct,
  updateProduct,
  getAllCategories,
};
