import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User Pages
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import FeaturedHoney from "../pages/user/components/FeaturedHoney";
import FeaturedMilk from "../pages/user/components/FeaturedMilk";
import FeaturedOil from "../pages/user/components/FeaturedOil";
import Cart from "../pages/user/Cart";
import CheckoutForm from "../pages/user/CheckoutForm";
import Orders from "../pages/user/Orders";
import Profile from "../pages/user/Profile";
import OrderSuccess from "../pages/user/components/OrderSuccess";

// Farmer Pages
import FarmerDashboard from "../pages/farmer/Dashboard";
import AddProduct from "../pages/farmer/AddProduct";
import MyProducts from "../pages/farmer/MyProducts";
import FarmerOrders from "../pages/farmer/Orders";
import FarmerProfile from "../pages/farmer/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import Farmers from "../pages/admin/Farmers";
import FarmerProducts from "../pages/admin/FarmerProducts"
import AdminOrders from "../pages/admin/AdminOrders";
import AdminReturns from "../pages/admin/AdminReturns";

import ProtectedRoute from "../components/common/ProtectedRoute";
import FarmerDetails from "../pages/admin/FarmerDetails";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminUserOrders from "../pages/admin/AdminUserOrders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/featured/honey" element={<FeaturedHoney />} />
        <Route path="/featured/milk" element={<FeaturedMilk />} />
        <Route path="/featured/oil" element={<FeaturedOil />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['farmer']} />}>
        <Route path="/farmer" element={<FarmerDashboard />}>
          <Route index element={<AddProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="profile" element={<FarmerProfile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmers/:id" element={<FarmerDetails />} />
          <Route path="farmers/:id/products" element={<FarmerProducts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="user/:id/orders" element={<AdminUserOrders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="returns" element={<AdminReturns />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes;
