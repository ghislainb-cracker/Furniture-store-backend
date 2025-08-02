// models/Product.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  rating: { type: Number, required: true },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // add image upload logic later
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
