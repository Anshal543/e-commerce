import { Router } from 'express';
import { addToCart, getCart, deleteCartItem, updateCartItem, emptyCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../middlewares/userVerification.js';

const router = Router();

router.post("/", verifyToken, addToCart)
router.get("/", verifyToken, getCart)
router.delete("/:id", verifyToken, deleteCartItem)
router.patch("/:id", verifyToken, updateCartItem)
router.put("/empty", verifyToken, emptyCart)
router.put("/", verifyToken, emptyCart)

export default router;