import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { placeOrder, getUserOrders, getFarmerOrders, getAllOrders, updateOrderStatus, markOrderAsPaid, getOrderById, cancelOrder, requestReturn, handleReturnRequest, getAllReturnRequests } from "../controllers/orderController.js";

const Router = express.Router();

Router.post("/", authenticate, placeOrder);
Router.get("/myorders", authenticate, getUserOrders);

Router.get("/farmer", authenticate, authorize("farmer"), getFarmerOrders);
Router.get("/", authenticate, authorize("admin"), getAllOrders);
Router.get("/:id", authenticate, authorize("admin"), getOrderById);

Router.patch("/:id/status", authenticate, authorize("admin"), updateOrderStatus);

Router.patch("/:id/pay", authenticate, markOrderAsPaid);

Router.patch("/cancel/:id", authenticate, authorize("user"), cancelOrder);
Router.patch("/return/:id", authenticate, authorize("user"), requestReturn);
Router.patch("/return/handle/:id", authenticate, authorize("admin"), handleReturnRequest);
Router.get("/return/all", authenticate, authorize("admin"), getAllReturnRequests);

export default Router;