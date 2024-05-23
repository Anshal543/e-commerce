import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cart.controller.js';

const router = Router();

router.post("/", addToCart)
router.get("/", getCart)

export default router;