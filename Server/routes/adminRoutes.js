import express from "express";
import {
  getAllProducts,
  approveProduct,
  rejectProduct,
  deleteProductByAdmin,
  getAllUsers,
  getUserById,
  deleteUserById,
  getAllFarmers,
  getFarmerById,
  deleteFarmerById,
  getUserOrdersByAdmin
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import productModel from "../models/Product.js";

const Router = express.Router();

Router.get("/profile", authenticate, authorize("admin"), (req, res) => {
  const { name, email } = req.user;
  res.json({ admin: { name, email } });
});

Router.get("/farmer/:id/products", authenticate, authorize("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel.find({ farmer: id });
    res.json({ products });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Product routes
Router.get("/products", authenticate, authorize("admin"), getAllProducts);
Router.patch("/products/:id/approve", authenticate, authorize("admin"), approveProduct);
Router.patch("/products/:id/reject", authenticate, authorize("admin"), rejectProduct);
Router.delete("/products/:id", authenticate, authorize("admin"), deleteProductByAdmin);

// User routes
Router.get("/allusers", authenticate, authorize("admin"), getAllUsers);
Router.get("/allusers/:id", authenticate, authorize("admin"), getUserById);
Router.delete("/allusers/:id", authenticate, authorize("admin"), deleteUserById);
Router.get('/user/:id/orders', authenticate, authorize("admin"), getUserOrdersByAdmin);

// Farmer routes
Router.get("/allfarmers", authenticate, authorize("admin"), getAllFarmers);
Router.get("/allfarmers/:id", authenticate, authorize("admin"), getFarmerById);
Router.delete("/allfarmers/:id", authenticate, authorize("admin"), deleteFarmerById);

export default Router;