// pages/farmer/components/Stats.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../components/contexts/AuthContext";

function Stats() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/farmers/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (error) {
        console.log("Failed to fetch farmer stats", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Products</h2>
        <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Orders</h2>
        <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Revenue</h2>
        <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue}</p>
      </div>
    </div>
  );
}

export default Stats;
