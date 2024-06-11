import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/userVerification.js";


const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/own", verifyToken, getUserOrders);

export default router;