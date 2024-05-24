import { Cart } from "../models/CartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { quantity, product, user } = req.body;
        const cartItem = await Cart.create({ quantity, product, user });
        const populatedCartItem = await Cart.findById(cartItem._id).populate('product').populate('user');
        res.status(201).json(populatedCartItem);

    } catch (error) {
        next(error)
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.query.id;
        const cart = await Cart.find({ user: userId }).populate('product').populate('user');
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        const transformedCartItems = cart.map(cartItem => {
            return {
                id: cartItem._id,
                quantity: cartItem.quantity,
                product: cartItem.product,
            }
        })        

        
        res.status(200).json(transformedCartItems);
    } catch (error) {
        next(error)
    }
}


export const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCartItem = await Cart.findByIdAndDelete(id);
        if (!deletedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json(deletedCartItem);
    } catch (error) {
        next(error)
    }
}       