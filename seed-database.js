// Seed Database Script
// Run with: node seed-database.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    title: "Gaming Chair Pro",
    description: "Ergonomic gaming chair with lumbar support and adjustable armrests",
    price: 299.99,
    category: "Furniture",
    stock: 15,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    isFeatured: true,
    isOnSale: false
  },
  {
    title: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation",
    price: 199.99,
    category: "Electronics",
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    isFeatured: true,
    isOnSale: true
  },
  {
    title: "Smart LED Desk Lamp",
    description: "Adjustable LED desk lamp with touch controls and multiple color temperatures",
    price: 89.99,
    category: "Electronics",
    stock: 30,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    isFeatured: false,
    isOnSale: false
  },
  {
    title: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard with customizable switches",
    price: 149.99,
    category: "Electronics",
    stock: 20,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    isFeatured: true,
    isOnSale: false
  },
  {
    title: "Ergonomic Office Chair",
    description: "Comfortable office chair with adjustable height and backrest",
    price: 249.99,
    category: "Furniture",
    stock: 12,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500",
    isFeatured: false,
    isOnSale: true
  },
  {
    title: "4K Gaming Monitor",
    description: "27-inch 4K gaming monitor with 144Hz refresh rate",
    price: 399.99,
    category: "Electronics",
    stock: 8,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    isFeatured: true,
    isOnSale: false
  },
  {
    title: "Gaming Mouse Pad",
    description: "Large RGB gaming mouse pad with non-slip base",
    price: 29.99,
    category: "Accessories",
    stock: 50,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    isFeatured: false,
    isOnSale: false
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 20-hour battery life",
    price: 79.99,
    category: "Electronics",
    stock: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    isFeatured: false,
    isOnSale: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Display inserted products
    console.log('\n📦 Sample Products Created:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('You can now test your API with these products.');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase(); 