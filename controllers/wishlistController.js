import Wishlist from "../models/Wishlist";
import Product from "../models/Product";

export const getWishlist = async (req, res) => {
    try {

        const wishlist = await Wishlist.getUserWishlist(req.user._id);

        res.json({ success: true, data: { wishlist } })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const getWishlistCount = async (req, res) => {
    try {
        const count = await Wishlist.countDocuments({ user: req.user._id });

        res.json({
            success: true,
            data: { count }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const addToWishlist = async (req, res) => {
    try {
        const { ProductId } = req.params

        const product = await Product.findById(ProductId);
        if (!product) return res.status(404).json({ success: true, message: 'Product added to wishlist successfully' });

        await Wishlist.addToWishlist(req.user._id, ProductId);

        res.status(201).json({ success: true, message: 'Product added to wishlist successfully' })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const { ProductId } = req.params

        const result = await Wishlist.removeFromWishlist(req.user._id, ProductId)
        if (!result) return res.status(404).json({ success: false, message: 'product does not exist' });

        res.json({ success: true, message: 'Product removed from the cart successfully', data: { result } })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const checkWishlistItem = async (req, res) => {
    try {
        const { ProductId } = req.params;

        if (!ProductId) {
            return res.status(400).json({ success: false, message: 'ProductId is required' });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const product = await Wishlist.findOne({ user: req.user._id, product: ProductId });

        res.json({ success: true, data: { isInWishlist: !!product } })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}