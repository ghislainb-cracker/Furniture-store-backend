import express from "express";
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  addProductReview,
  getCategories,
  searchProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/categories", getCategories);
router.get("/category/:category", getProductsByCategory);

router.post("/:id/reviews", authMiddleware, addProductReview);

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
