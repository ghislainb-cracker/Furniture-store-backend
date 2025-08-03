import Cart from "../models/Cart";
import Product from "../models/Product";

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
        const { productId, quantity = 1, option = {} } = req.body;
        const userId = req.user._id;

        let product = await Product.findById(ProductId);
        if (!product) return res.status(404).json({ success: false, message: 'product not found' });
        if (!product.isAvailable) return res.status(404).json({ success: false, message: 'product is not available' });
        if (!product.stock < quantity) return res.status(404).json({ success: false, message: 'product is out of stock' });

        let cart = await Cart.findOne({ user: userId }) || await Cart.create({ user: userId, items: [] });

        await cart.addItem(ProductId, quantity, product.price);
        await Cart.populate('items.product', 'title price images category isAvailable stock');

        res.status(201).json({ success: true, message: 'added o cart successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

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