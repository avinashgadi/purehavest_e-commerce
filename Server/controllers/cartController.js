import cartModel from "../models/Cart.js";
import productModel from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const existing = await cartModel.findOne({ user: req.user.id, product: productId });

    if(existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      return res.status(200).json({ message: 'Cart updated: ', cart: existing });
    }

    const cart = await cartModel.create({
      user: req.user.id, product: productId, quantity: quantity || 1,
    });

    res.status(201).json({ message: 'Added to cart', cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cartItems = await cartModel.find({ user: req.user.id }).populate('product');
    res.status(200).json({ cart: cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cartItem = await cartModel.findOne({ _id: req.params.id, user: req.user.id });
    if(!cartItem) return res.status(404).json({ message: 'Item not found' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart updated', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' })
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const deleted = await cartModel.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if(!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart items' });
  }
};