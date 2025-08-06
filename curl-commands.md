# Quick API Testing with cURL

## Prerequisites
Make sure your server is running: `npm run dev`

## Basic Tests

### 1. Health Check
```bash
curl -X GET http://localhost:5000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Get All Products
```bash
curl -X GET http://localhost:5000/api/products
```

### 5. Get Single Product (replace PRODUCT_ID)
```bash
curl -X GET http://localhost:5000/api/products/PRODUCT_ID
```

### 6. Create Product (requires auth token)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Product",
    "description": "This is a test product",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10,
    "image": "https://example.com/image.jpg"
  }'
```

### 7. Add to Cart (requires auth token)
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

### 8. Get Cart (requires auth token)
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 9. Add to Wishlist (requires auth token)
```bash
curl -X POST http://localhost:5000/api/wishlist/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID_HERE"
  }'
```

### 10. Get Wishlist (requires auth token)
```bash
curl -X GET http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Windows PowerShell Commands

If you're using Windows PowerShell, use these commands instead:

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
```

### Register User
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login User
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

## Quick Test Sequence

1. **Start server**: `npm run dev`
2. **Seed database**: `npm run seed`
3. **Test health**: `curl -X GET http://localhost:5000/api/health`
4. **Register user**: Use the register curl command above
5. **Login user**: Use the login curl command above (save the token)
6. **Get products**: `curl -X GET http://localhost:5000/api/products`
7. **Test cart/wishlist**: Use the saved token in the respective commands

## Tips

- Replace `YOUR_JWT_TOKEN` with the actual token received from login
- Replace `PRODUCT_ID_HERE` with actual product IDs from your database
- Use `jq` to format JSON responses: `curl ... | jq`
- Save tokens in environment variables for easier testing 