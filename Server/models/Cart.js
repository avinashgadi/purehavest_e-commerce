import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
  }, { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;