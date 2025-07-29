import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

import cors from "cors";


// import express from "express";
// import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js'
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import publicProductRoutes from './routes/publicProductRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';


connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://pureharvest-mern.vercel.app"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
// app.options("/*", cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/farmers/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", publicProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

const port = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
