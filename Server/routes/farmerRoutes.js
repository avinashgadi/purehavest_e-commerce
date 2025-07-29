import express from 'express';
import { registerFarmer, loginFarmer, updateProfile, farmerStats, profile } from '../controllers/farmerController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const Router = express.Router();

Router.post("/register", registerFarmer);
Router.post("/login", loginFarmer);
Router.get("/profile", authenticate, authorize("farmer"), profile);
Router.patch("/updateprofile", authenticate, authorize("farmer"), upload.single("avatar"), updateProfile);
Router.get("/stats", authenticate, authorize("farmer"), farmerStats);

export default Router;