// controllers/productController.js
import Product from "../models/Product.js";

//    Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

//    Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
};

//    Create a product (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: "Product created", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product creation failed", error: error.message });
  }
};

//    Update a product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product updated", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Product update failed" });
  }
};

//    Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};


//    Search products by title
export const searchProducts = async (req, res) => {
    try {
      const keyword = req.query.q || "";
      const products = await Product.find({ title: { $regex: keyword, $options: "i" } });
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Search failed" });
    }
  };
  
  // by category
  export const getByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const products = await Product.find({ category });
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Category filter failed" });
    }
  };
  
  //  featured products
  export const getFeaturedProducts = async (req, res) => {
    try {
      const products = await Product.find({ isFeatured: true });
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Featured fetch failed" });
    }
  };
  
  //  sale products
  export const getSaleProducts = async (req, res) => {
    try {
      const products = await Product.find({ isOnSale: true });
      res.json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Sale fetch failed" });
    }
  };
  
  //  All categories
  export const getAllCategories = async (req, res) => {
    try {
      const categories = await Product.distinct("category");
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: "Category fetch failed" });
    }
  };
  