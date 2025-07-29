import razorpayInstance from "../config/razorpay.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(201).json({ message: "Razorpay order created successfully", orderId: order.id, currency: order.currency, amount: order.amount, });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create razorpay order" });
  }
};