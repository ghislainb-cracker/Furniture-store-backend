E-Commerce Backend Documentation
Project Directory: ecommerce-backend/

This document provides an overview of the backend structure for the Fun Store E-Commerce application, built with Node.js, Express, and MongoDB.

📁 Project Structure
Root-Level Files

File	Description
package.json	Contains project metadata, scripts, and dependencies.
.env	Stores environment variables (e.g., MONGODB_URI, JWT_SECRET, PORT).
server.js	Main entry point—initializes Express, connects to MongoDB, and sets up middleware/

routes.
📂 Folder Breakdown
1. config/
Handles application configurations.

File	Description
db.js	Manages MongoDB connection using Mongoose.
2. controllers/
Contains business logic for handling HTTP requests.

File	Description
productController.js	CRUD operations for products (create, read, update, delete).
userController.js	User registration, login, profile management.
cartController.js	Manages cart operations (add/remove items).
wishlistController.js	Handles wishlist actions.
orderController.js	Processes order placement, history, and status updates.
3. models/
Defines MongoDB schemas (data structure).

File	Description
Product.js	Schema for product details (name, price, description, image, category).
User.js	User schema (name, email, hashed password, role).
Cart.js	Stores user cart items.
Wishlist.js	Tracks wishlisted products.
Order.js	Records order details (user reference, items, status, payment info).
4. routes/
Defines API endpoints and links them to controllers.

File	Endpoint Base	Description
productRoutes.js	/api/products	Product-related routes.
userRoutes.js	/api/users	User authentication & management.
cartRoutes.js	/api/cart	Cart operations.
wishlistRoutes.js	/api/wishlist	Wishlist management.
orderRoutes.js	/api/orders	Order processing.
5. middleware/
Custom middleware functions for request processing.

File	Description
errorMiddleware.js	Centralized error handling.
authMiddleware.js	Authenticates users & checks roles (e.g., admin).
6. utils/
Helper functions for reusability.

File	Description
validateData.js	Validates request payloads before DB operations.
7. uploads/
Stores user-uploaded files (e.g., product images).

Subfolder	Description
product-images/	Contains product images.
🔧 How to Run the Project
Install dependencies:

bash
npm install
Set up .env (use .env.example as a template).

Start the server:

bash
npm start
Access API at http://localhost:[PORT]/api/.

📌 Notes
Authentication: JWT-based (handled in authMiddleware.js).

Error Handling: Global error catcher in errorMiddleware.js.

Database: MongoDB via Mongoose (config/db.js).