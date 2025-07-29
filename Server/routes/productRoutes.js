import express from 'express';
import { createProduct, getMyProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const Router = express.Router();

Router.post("/", authenticate, authorize("farmer"), upload.single('image'), createProduct);
Router.get("/", authenticate, authorize("farmer"), getMyProducts);
Router.patch("/:id", authenticate, authorize("farmer"), upload.single("image"), updateProduct);
Router.delete("/:id", authenticate, authorize("farmer"), deleteProduct);

export default Router;