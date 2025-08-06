# E-commerce Backend Testing Guide

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test the health endpoint:**
   ```
   GET http://localhost:5000/api/health
   ```

## 📋 Available Endpoints

### 🔐 Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### 🛍️ Product Routes (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### 🛒 Cart Routes (`/api/cart`)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### ❤️ Wishlist Routes (`/api/wishlist`)
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/remove/:id` - Remove item from wishlist

## 🧪 Testing with Postman/Thunder Client

### 1. Health Check
```
GET http://localhost:5000/api/health
```

### 2. User Registration
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. User Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 4. Create Product (Admin)
```
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Test Product",
  "description": "This is a test product",
  "price": 99.99,
  "category": "Electronics",
  "stock": 10,
  "image": "https://example.com/image.jpg"
}
```

### 5. Get All Products
```
GET http://localhost:5000/api/products
```

### 6. Add to Cart
```
POST http://localhost:5000/api/cart/add
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

### 7. Add to Wishlist
```
POST http://localhost:5000/api/wishlist/add
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "productId": "PRODUCT_ID_HERE"
}
```

## 🔧 Environment Variables

Make sure you have a `.env` file with:
```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

## 📊 Test Data Examples

### Sample Products
```json
{
  "title": "Gaming Chair",
  "description": "Ergonomic gaming chair with lumbar support",
  "price": 299.99,
  "category": "Furniture",
  "stock": 15,
  "image": "https://example.com/gaming-chair.jpg"
}
```

```json
{
  "title": "Wireless Headphones",
  "description": "Noise-cancelling wireless headphones",
  "price": 199.99,
  "category": "Electronics",
  "stock": 25,
  "image": "https://example.com/headphones.jpg"
}
```

## 🐛 Common Issues & Solutions

1. **CORS Error**: Make sure `FRONTEND_URL` is set correctly
2. **Database Connection**: Check your MongoDB connection string
3. **JWT Token**: Ensure you're sending the token in the Authorization header
4. **File Uploads**: Use `multipart/form-data` for image uploads

## 📱 Testing Tools

- **Postman**: Best for API testing
- **Thunder Client**: VS Code extension for API testing
- **Insomnia**: Alternative to Postman
- **curl**: Command line testing

## 🎯 Testing Checklist

- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] User registration works
- [ ] User login works
- [ ] JWT token is generated
- [ ] Protected routes require authentication
- [ ] Products can be created/read/updated/deleted
- [ ] Cart operations work
- [ ] Wishlist operations work
- [ ] Error handling works properly
- [ ] CORS is configured correctly 