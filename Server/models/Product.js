import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Dairy", "Cereals", "Grains", "Vegetables", "Fruits", "Spices", "Dryfruits", "meat"],
      required: true
    },
    description: { type: String },
    price: { type: Number, required: true },
    unit: {
      type: String, 
      enum: ["kg", "gram", "litre", "ml", "piece", "dozen", "pack"],
      required: true,
    },
    quantity: { type: Number, required: true },
    image: { type: String },
    status: {
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending"
    },
  }, { timestamps: true }
);

const productModel = await mongoose.model("Product", productSchema);

export default productModel;