import express from "express"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeFromCart);
router.delete('/clear', clearCart);

export default router