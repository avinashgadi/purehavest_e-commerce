import express from "express";
import { addToCart, getUserCart, updateCartItem, deleteCartItem } from "../controllers/cartController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post('/', authenticate, authorize('user'), addToCart);
Router.get('/', authenticate, authorize('user'), getUserCart);
Router.put('/:id', authenticate, authorize('user'), updateCartItem);
Router.delete('/:id', authenticate, authorize('user'), deleteCartItem);

export default Router;