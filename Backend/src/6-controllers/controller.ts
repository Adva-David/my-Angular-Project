import express from "express";
import validateToken from "../3-middleware/auth-only";
import orderController from "./order-controller";
import authController from "./auth-controller";
import productsController from "./products-controller";
import cartController from "./cart-controller";
import adminController from "./admin-controller";
const router = express.Router();

router.use("/orders", orderController);
router.use("/auth", authController);
router.use("/cart", validateToken, cartController);
router.use("/admin", adminController);
router.use("/products", productsController);
export default router;
