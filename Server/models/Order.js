import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1, },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["confirmed", "shipped", "delivered", "cancelled"], default: "confirmed" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    canceled: { type: Boolean, default: false },
    cancelReason: { type: String, default: "" },
    returnRequested: { type: Boolean, default: false },
    returnReason: { type: String, default: "" },
    returnStatus: { type: String, enum: ["pending", "approved", "rejected"], default: null, },
    returnNote: { type: String, default: "" },
  }, { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;