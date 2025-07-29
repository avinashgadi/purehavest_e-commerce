import productModel from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, quantity, unit, image } = req.body;
    const product = await productModel.create(
      { name, category, description, price, quantity, unit, image: req.file?.path, farmer: req.user.id, }
    );
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await productModel.find({ farmer: req.user.id });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, category, description, price, quantity, unit } = req.body;
    const image = req.file?.path;
    const product = await productModel.findOne({ _id: req.params.id, farmer: req.user.id });
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if(name) product.name = name;
    if(category) product.category = category;
    if(description) product.description = description;
    if(price) product.price = price;
    if(quantity) product.quantity = quantity;
    if(unit) product.unit = unit;
    if(image) product.image = image;

    const updated = await product.save();
    res.json({ message: "Product updated successfully", updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllApprovedProducts = async (req, res) => {
  try {
    const products = await productModel.find({ status: "approved" }).populate("farmer", "name email");
    res.status(200).json({ message: "All approved products", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate("farmer", "name email");

    if(!product || product.status !== "approved") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product details", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};