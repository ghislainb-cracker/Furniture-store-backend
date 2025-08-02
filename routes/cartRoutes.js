import express from "express"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController"

const route = express.Router;

route.get('/', getCart);
route.post('/add', addToCart);
route.put('/update/:itemId', updateCartItem);
route.delete('/remove/:itemId', removeFromCart);
route.delete('/clear', clearCart);