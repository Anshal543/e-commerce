import { Cart } from "../models/CartModel.js";

// redifine my backend logic if product is already in cart just update the quantity and if not add it to the cart

export const addToCart = async (req, res) => {
    try {
        const { quantity, product,  } = req.body;
        const cartItem = await Cart.findOne({ product, user: req.user._id});
        if (cartItem) {
            const updatedCartItem = await Cart.findByIdAndUpdate(cartItem._id, { quantity: cartItem.quantity + quantity }, { new: true }).populate('product').populate('user');
            return res.status(201).json(updatedCartItem);
        }
        const newCartItem = await Cart.create({ quantity, product, user:req.user._id });
        const populatedCartItem = await Cart.findById(newCartItem._id).populate('product').populate('user');
        res.status(201).json(populatedCartItem);
    }
    catch (error) {
        next(error)
    }
}

// export const addToCart = async (req, res) => {
//     try {
//         const { quantity, product, user } = req.body;
//         const cartItem = await Cart.create({ quantity, product, user });
//         const populatedCartItem = await Cart.findById(cartItem._id).populate('product').populate('user');
//         res.status(201).json(populatedCartItem);

//     } catch (error) {
//         next(error)
//     }
// }

export const getCart = async (req, res) => {
    try {
        // const userId = req.query.id;
        const cart = await Cart.find({ user: req.user._id }).populate('product').populate('user');
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


export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        // const { quantity } = req.body;
        // const {id} = req.user._id
        const updatedCartItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        const cart = await updatedCartItem.populate('product')
        res.status(200).json(cart);
    }
    catch (error) {
        next(error)
    }

}