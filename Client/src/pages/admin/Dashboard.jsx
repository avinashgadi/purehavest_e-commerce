import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <Sidebar />
      <div className="flex-1 p-6 transition-all duration-300">
          <Outlet />        
      </div>
    </div>
  );
}

export default Dashboard;
