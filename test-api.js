// Simple API Test Script
// Run with: node test-api.js

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testProduct = {
  title: 'Test Product',
  description: 'This is a test product for testing',
  price: 99.99,
  category: 'Electronics',
  stock: 10,
  image: 'https://example.com/test-image.jpg'
};

let authToken = '';

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('Request failed:', error.message);
    return { status: 500, data: { error: error.message } };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('🔍 Testing Health Check...');
  const result = await makeRequest(`${BASE_URL}/health`);
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  console.log('---');
}

async function testUserRegistration() {
  console.log('👤 Testing User Registration...');
  const result = await makeRequest(`${BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  console.log('---');
}

async function testUserLogin() {
  console.log('🔑 Testing User Login...');
  const result = await makeRequest(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password
    })
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  
  if (result.data.token) {
    authToken = result.data.token;
    console.log('✅ Token received:', authToken.substring(0, 20) + '...');
  }
  console.log('---');
}

async function testGetProducts() {
  console.log('📦 Testing Get Products...');
  const result = await makeRequest(`${BASE_URL}/products`);
  console.log('Status:', result.status);
  console.log('Products count:', result.data.length || 0);
  console.log('---');
}

async function testCreateProduct() {
  if (!authToken) {
    console.log('❌ No auth token available for product creation');
    return;
  }
  
  console.log('➕ Testing Create Product...');
  const result = await makeRequest(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(testProduct)
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  console.log('---');
}

async function testAddToCart() {
  if (!authToken) {
    console.log('❌ No auth token available for cart operations');
    return;
  }
  
  console.log('🛒 Testing Add to Cart...');
  const result = await makeRequest(`${BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      productId: 'test-product-id', // You'll need a real product ID
      quantity: 2
    })
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  console.log('---');
}

async function testAddToWishlist() {
  if (!authToken) {
    console.log('❌ No auth token available for wishlist operations');
    return;
  }
  
  console.log('❤️ Testing Add to Wishlist...');
  const result = await makeRequest(`${BASE_URL}/wishlist/add`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      productId: 'test-product-id' // You'll need a real product ID
    })
  });
  console.log('Status:', result.status);
  console.log('Response:', result.data);
  console.log('---');
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  
  await testHealthCheck();
  await testUserRegistration();
  await testUserLogin();
  await testGetProducts();
  await testCreateProduct();
  await testAddToCart();
  await testAddToWishlist();
  
  console.log('✅ All tests completed!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(console.error);
}

export { runAllTests }; 