import { Router } from 'express';
import { addToCart, getCart ,deleteCartItem, updateCartItem} from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/userVerification.js';

const router = Router();

router.post("/", addToCart)
router.get("/", getCart)
router.delete("/:id", deleteCartItem)
router.patch("/:id", updateCartItem)

export default router;