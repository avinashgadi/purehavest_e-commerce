import orderModel from "../models/Order.js";
import productModel from "../models/Product.js";
import userModel from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const user = await userModel.findById(req.user.id);
    if(!user || !user.address) {
      return res.status(400).json({ message: "User address not found" });
    }
    const order = await orderModel.create({
      user: req.user.id,
      items, totalAmount,
      shippingAddress: user.address,
    });
    res.status(201).json({ message: "Order placed", orderDetails: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user.id }).populate("items.product", "name price category image");
    res.status(200).json({ message: "User orders", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const farmerProducts = await productModel.find({ farmer: req.user.id });
    const productIds = farmerProducts.map((p) => p._id);

    const orders = await orderModel
      .find({ "items.product": { $in: productIds } })
      .populate("user", "name email")
      .populate("items.product");

    res.status(200).json({ message: "Total Orders", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to fetch farmer orders"});
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .populate("items.product", "name email");

    res.status(200).json({ message: "All Orders", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name category");

    if(!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order fetched", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ["confirmed", "shipped", "delivered"];
    if(!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const order = await orderModel.findById(req.params.id);
    if(!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    const updatedOrder = await order.save();
    
    res.status(200).json({ message: "Order status updated", order: updatedOrder, });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const markOrderAsPaid = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if(!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.paymentStatus = "paid";
    await order.save();

    res.status(200).json({ message: "Payment marked as successfull", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await orderModel.findOne(
      { _id: req.params.id, user: req.user.id }
    );
    if(!order) return res.status(404).json({ message: "Order not found" });
    if(order.status !== "confirmed") {
      return res.status(400).json({ message: "Cannot cancel after shipped" });
    }

    order.status = "cancelled";
    order.canceled = true;
    order.cancelReason = reason || "";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

export const requestReturn = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await orderModel.findOne(
      { _id: req.params.id, user: req.user.id, }
    );
    if(!order) return res.status(404).json({ message: "Order not found" });
    if(order.status !== "delivered") return res.status(400).json({ message: "Return allowed after delivery only" });
    order.returnRequested = true;
    order.returnReason = reason || "No reason provided";
    order.returnStatus = "pending";
    
    await order.save();

    res.status(200).json({ message: "Return requested", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to request return" });
  }
};

export const handleReturnRequest = async (req, res) => {
  try {
    const { status, note } = req.body;
    const validStatus = ["approved", "rejected"];

    if(!validStatus.includes(status)) return res.status(400).json({ message: "Invalid return status" });
    const order = await orderModel.findById(req.params.id);
    if(!order || !order.returnRequested) return res.status(404).json({ message: "No return request found" });

    order.returnStatus = status;
    order.returnNote = status === "rejected" ? note || "No reason provided" : "";
    await order.save();

    res.status(200).json({ message: `Return ${status}`, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to process return request" });
  }
};

export const getAllReturnRequests = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ returnRequested: true })
      .populate("user", "name email")
      .populate("items.product", "name category image");

    res.status(200).json({ message: "All return requests fetched", returnRequests: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch return requests" });
  }
};