import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

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
        // Ensure user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const { productId, quantity = 1, option = {} } = req.body;
        const userId = req.user._id;

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        if (!product.isAvailable) {
            return res.status(400).json({ success: false, message: 'Product is not available' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: 'Product is out of stock' });
        }

        // Find or create the cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        // Add item to the cart
        await cart.addItem(productId, quantity, product.price, option);

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