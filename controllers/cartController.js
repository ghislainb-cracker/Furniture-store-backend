import { SchemaTypeOptions } from "mongoose";
import Cart from "../models/Cart";
import Product from "../models/Product";

export const getCart = async (req, res) => {
    try{
        const userId = req.user._id;

        const cart = await Cart.findOne({user: userId}).populate(
            'items.product',
            'title, price, images, category, isAvailable, stock'
        );

        if(!cart){
            cart = await Cart.create({user: userId, item: []});
        }
        res.send({success: true, cart})
    }catch(err){
       res.status(500).json({success: false, message: err.message});
    }
}

export default addToCart = async () => {
    try{
        const { ProductId, quantity = 1, option = {} } = req.body;
        const userId = req.user._id;

        let product = Product.findById(ProductId);
        if(!product) return res.status(404).json({success: false, message: 'product not found'});
        if(!product.isAvailable) return res.status(404).json({success: false, message: 'product is not available'});
        if(!product < quantity) return res.status(404).json({success: false, message: 'product is out of stock'});

        let cart = await Cart.findOne({user: userId}) || await Cart.create({user: userId, item: []});

        await Cart.addItem(ProductId, quantity, SchemaTypeOptions, product.price);
        await Cart.populate('items.produc', 'title, price, images, category, isAvailable, stock');

        res.status(201).json({success: true, message: 'added o cart successfully'});
    }catch(err){
        res.status(500).json({success: false, message: err.message})
    }
}