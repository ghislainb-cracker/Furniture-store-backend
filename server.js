<<<<<<< HEAD
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"

import cartRoute from "./routes/cartRoutes"
import wishListRoute from "./routes/wishlistRoutes"

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credential: false
}))
app.use(express.urlencoded({extended: false}));

const __filename = fileURLToPath(import.meta.url);
const __diename = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("connected to the database");
})
.catch(() => {
    console.log("Failed to connect to the database")
})

app.use("/api/cart", cartRoute);
app.use("api/wishlist", wishListRoute);


app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`)
})
=======
// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; 
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
>>>>>>> origin/bimzed
