import express from "express";
import adminProductsRoute from "./admin-products";
import validateAdmin from "../3-middleware/admin-only";
const router = express.Router();

router.use(validateAdmin);
router.use("/products", adminProductsRoute);

export default router;
