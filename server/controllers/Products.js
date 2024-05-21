import { ProductModel } from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
    try {
        const products = await ProductModel.create(req.body);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
}

export const getProducts = async (req, res) => {

    try {

        let query = ProductModel.find({});

        if (req.query.category) {
            query = query.find({ category: { $in: req.query.category.split(',') } });
        }

        if (req.query.brand) {
            query = query.find({ brand: req.query.brand });
        }
        if(req.query._sort){
            query = query.sort({[req.query._sort]: req.query._order === 'asc' ? 1 : -1})
        }

        let limit = Number(req.query._limit) || 10;
        let page = Number(req.query._page) || 1;
        let skip = (page - 1) * limit;

        let docs = await query.skip(skip).limit(limit).exec();
        res.status(200).json(docs);
    } catch (err) {
        next(err);
    }
}


export const getProductBySearch = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await ProductModel.find({

            $or: [
                { name: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { brand: { $regex: q, $options: 'i' } }
            ]
        }
        );
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
}  

export const getSingleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });   
        res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
}