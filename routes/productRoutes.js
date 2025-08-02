import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getByCategory,
  getFeaturedProducts,
  getSaleProducts,
  getAllCategories,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Product CRUD
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

//Filtering
router.get("/category/:category", getByCategory);
router.get("/featured", getFeaturedProducts);
router.get("/sale", getSaleProducts);
router.get("/categories", getAllCategories);
router.get("/search", searchProducts);

export default router;
