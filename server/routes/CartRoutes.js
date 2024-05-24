import { Router } from 'express';
import { addToCart, getCart ,deleteCartItem} from '../controllers/cart.controller.js';

const router = Router();

router.post("/", addToCart)
router.get("/", getCart)
router.delete("/:id", deleteCartItem)

export default router;