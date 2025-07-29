import express from 'express';
import { createPaymentOrder } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.post("/order", authenticate, createPaymentOrder);

export default Router;