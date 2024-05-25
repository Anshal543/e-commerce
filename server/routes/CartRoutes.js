import { Router } from 'express';
import { addToCart, getCart, deleteCartItem, updateCartItem } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/userVerification.js';

const router = Router();

router.post("/", verifyToken, addToCart)
router.get("/", verifyToken, getCart)
router.delete("/:id", verifyToken, deleteCartItem)
router.patch("/:id", verifyToken, updateCartItem)

export default router;