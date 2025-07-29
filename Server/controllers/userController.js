import bcrypt from 'bcryptjs';
import userModel from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name, email, password: hashedPassword, role: role || "user", address: role === "user" ? address : undefined,
    };
    
    const result = await userModel.create(user);
    res.status(201).json({ message: "Registration successfull", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if(existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if(isMatch) {
        const userObj = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role
        }
        const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Logged-in successfully", user: userObj, token });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const profile = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).select("-password");
    if(!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ message: "Profile", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email: req.user.email });
    if(!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if(name) user.name = name;
    if(email) user.email = email;
    if(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({ message: "Profile updated successfully", name: updatedUser.name, email: updatedUser.email, role: updatedUser.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { fullName, phone, street, city, state, pincode, country } = req.body;

    const user = await userModel.findOne({ email: req.user.email });

    user.address = { fullName, phone, street, city, state, pincode, country };
    await user.save();

    res.status(200).json({ message: "Address updated successfully", address: user.address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update address" });
  }
};