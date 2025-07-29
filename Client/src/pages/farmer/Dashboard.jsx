import React from 'react'
import Sidebar from "./components/Sidebar";
import Stats from './components/Stats';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='flex min-h-screen bg-gray-50 pt-16'>
      <Sidebar />
      <div className='flex-1 p-6 md:ml-64 transition-all duration-300'>
        <Stats />
        <div className='mt-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
