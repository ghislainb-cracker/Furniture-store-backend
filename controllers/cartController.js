import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate(
            'items.product',
            'title price images category isAvailable stock'
        );

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }
        res.json({ success: true, cart })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const addToCart = async (req, res) => {
    try {

        const { quantity = 1, options = {} } = req.body;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTc2ZTZlYzk4YmVhYTUwNWFlOGM5NiIsImlhdCI6MTc1NDg2MDI3M30.0bvOsnyEsOYWleUFDbj-Rh-eZ2lV9dUa43lhtn_Nuk8"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const productId = "68990b0bea4269d68e6f10ba";
        const ids = "68976e6ec98beaa505ae8c96"
        // Find the product by ID in mongodb product schema database
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
            return res.json(Product.findOne());
        }
        // if (!product.isAvailable) {
        //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //     return res.status(400).json({ 
        //         success: false, 
        //         message: 'Product is not available',
        //         decoded: decoded
        //     });
           
        // }
        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: 'Product is out of stock' });
        }

        // Find or create the cart
        let cart = await Cart.findOne({ user: decoded.id });
        if (!cart) {
            cart = await Cart.create({ user: decoded.id, items: [] });
        }

        // Add item to the cart
        await cart.addItem(productId, quantity, options, product.price);

        // Populate product details in the response
        await cart.populate('items.product', 'title price images category isAvailable stock');

        res.status(201).json({ success: true, message: 'Added to cart successfully', cart });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1)
            return res.status(400).json({ success: false, message: "Quantity must be atleast one" });

        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart)
            return res.json({ success: false, message: 'Cart not found' });

        const cartItem = cart.items.id(itemId);
        if (!cartItem)
            return res.status(404).json({ success: false, message: 'Cart item not found' });

        const product = await Product.findById(cartItem.product);
        if (product.stock < quantity)
            return res.status(400).json({ success: false, message: 'Insufficient stock' });


        await cart.updateQuantity(itemId, quantity);
        await cart.populate('items.product', 'title price images category isAvailable stock');

        res.json({ success: true, message: 'cart updated successfully', cart })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        await cart.removeItem(itemId);
        await cart.populate('items.product', 'title price images category isAvailable stock');

        res.json({ success: true, message: 'item removed form cart successfully', cart: { cart } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const clearCart = async (req, res) => {
    try {        
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'cart not found' });

        await cart.clearCart();

        res.json({ success: true, message: 'Cart cleared successfully',  cart  })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}