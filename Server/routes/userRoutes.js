import express from 'express';
import { loginUser, registerUser, profile, updateProfile, updateAddress } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.get("/profile", authenticate, profile);
Router.patch("/updateprofile", authenticate, updateProfile);
Router.patch("/address", authenticate, authorize("user"), updateAddress);
    
export default Router;