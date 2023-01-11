import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
  categoryName: string;
}

export const CategorySchema = new mongoose.Schema<ICategoryModel>(
  {
    categoryName: {
      type: String,
      required: [true, "Missing category name"],
      minlength: [3, "Name too short"],
      maxlength: [100, "Name too long"],
      trim: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model<ICategoryModel>(
  "CategoryModel",
  CategorySchema,
  "category"
);
