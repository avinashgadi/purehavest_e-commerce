import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "farmer" },
    avatar: { type: String, default: "", }
  }, { timestamps: true }
);

const farmerModel = mongoose.model("Farmer", farmerSchema);

export default farmerModel;