import express  from "express";
import { getAllApprovedProducts, getProductById } from "../controllers/productController.js";

const Router = express.Router();

Router.get("/", getAllApprovedProducts);
Router.get("/:id", getProductById);

export default Router;