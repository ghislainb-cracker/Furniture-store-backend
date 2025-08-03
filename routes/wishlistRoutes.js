import express from "express";
import { getWishlist, getWishlistCount, checkWishlistItem, addToWishlist, removeFromWishlist  } from "../controllers/wishlistController"

const route = express.Router();

route.get('/', getWishlist);
route.get('/count', getWishlistCount);
route.get('/check/:productId', checkWishlistItem);
route.post('/add/:productId', addToWishlist);
route.delete('/remove/:productId', removeFromWishlist);

export default route