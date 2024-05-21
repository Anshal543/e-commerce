import { ProductModel } from "../models/ProductModel.js";

export const addToCart = async(req,res)=>{
    try{
        const product = await ProductModel.findById(req.params.id);
        if(product){
            req.session.cart.push(product);
            res.status(200).json(req.session.cart);
        }
    }catch(err){
        next(err);
    }

}
