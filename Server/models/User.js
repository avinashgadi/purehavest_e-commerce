import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'farmer', 'admin'], },
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
  }, { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;