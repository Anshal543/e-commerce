import { Router } from "express";
import { getProducts, addProduct , getProductBySearch, getSingleProduct, updateProduct} from "../controllers/Products.js";


const router = Router();

router.post('/',addProduct)
router.get('/',getProducts)
router.get('/search',getProductBySearch)
router.get('/:id',getSingleProduct)
router.patch('/:id',updateProduct)


export default router