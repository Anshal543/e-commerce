import { Router } from "express";
import { getProducts, addProduct , getProductBySearch} from "../controllers/Products.js";


const router = Router();

router.post('/',addProduct)
router.get('/',getProducts)
router.get('/search',getProductBySearch)


export default router