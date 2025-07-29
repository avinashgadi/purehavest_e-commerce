import farmerModel from "../models/Farmer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productModel from "../models/Product.js";
import orderModel from "../models/Order.js";

export const registerFarmer = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingFarmer = await farmerModel.findOne({ email });
    if(existingFarmer) {
      return res.status(400).json({ message: "Farmer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name, email, password: hashedPassword, role: role || "farmer",
    };

    const result = await farmerModel.create(user);
    res.status(201).json({ message: "Registration successfull", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingFarmer = await farmerModel.findOne({ email });
    if(existingFarmer) {
      const isMatch = await bcrypt.compare(password, existingFarmer.password);
      if(isMatch) {
        const userObj = {
          id: existingFarmer._id, name: existingFarmer.name, email: existingFarmer.email, role: existingFarmer.role
        }
        const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Logged-in successfully", user: userObj, token });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const profile = async (req, res) => {
  try {
    const farmer = await farmerModel.findOne({ email: req.user.email }).select("-password");
    if(!farmer) {
      return res.status(404).json({ message: "farmer not found" });
    }
    res.json({ message: "Profile", farmer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const farmer = await farmerModel.findOne({ email: req.user.email });
    if(!farmer) return res.status(404).json({ message: "Farmer not found" });

    if(name) farmer.name = name;
    if(email) farmer.email = email;
    if(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      farmer.password = hashedPassword;
    }

    if(req.file) {
      farmer.avatar = req.file.path;
    }
    const updatedFarmer = await farmer.save();

    res.json({ message: "Profile updated successfully", name: updatedFarmer.name, email: updatedFarmer.email, avatar: updatedFarmer.avatar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const farmerStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments({ farmer: req.user.id });

    const orders = await orderModel.find({ status: "delivered", "items.product": { $exists: true } }).populate("items.product");

    let totalOrders = 0;
    let totalRevenue = 0;

    orders.forEach(order => {
      order.items.forEach(item => {
        if(item.product?.farmer?.toString() === req.user.id) {
          totalOrders += 1;
          totalRevenue += item.product.price * item.product.quantity;
        }
      });
    });

    res.status(200).json({ totalProducts, totalOrders, totalRevenue, });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch farmer stats" });
  }
};