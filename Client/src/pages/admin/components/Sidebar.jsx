import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaUserShield, FaClipboardList, FaSignOutAlt, FaBars, FaTimes, FaUndoAlt, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../../components/contexts/AuthContext';
import admin_logo from '../../../assets/admin.png';
import axios from 'axios';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${API}/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data.admin);
      } catch (error) {
        console.log("Failed to fetch admin profile: ", error);
      }
    };
    fetchAdmin();
  }, [token]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSideBar = () => setIsOpen(prev => !prev);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded hover:bg-green-100 ${
      isActive ? 'bg-green-200 font-semibold' : ''}`;
  
  return (
    <>
      <div className='md:hidden fixed z-50'>
        <button onClick={toggleSideBar} className='text-2xl text-green-800'>
          {isOpen ? <FaTimes /> : <FaChevronRight />}
        </button>
      </div>

      <aside className={`bg-white border-r border-gray-200 p-4 min-h-screen w-64 fixed md:static z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className='flex flex-col items-center mb-6'>
          <img src={admin_logo} alt="Admin" className='w-20 h-20 rounded-full object-cover mb-2' />
          <h2 className='text-lg font-bold text-green-700'>
            {admin?.name || "Admin"}
          </h2>
          <p className='text-sm text-gray-500'>{admin?.email || "admin@gmail.com"}</p>
        </div>

        <nav className='flex flex-col gap-4'>
          <NavLink to="/admin/farmers" onClick={toggleSideBar} className={linkClasses}>
            <FaUsers /> Farmers
          </NavLink>

          <NavLink to="/admin/products" onClick={toggleSideBar} className={linkClasses}>
            <FaBoxOpen /> Products
          </NavLink>

          <NavLink to="/admin/users" onClick={toggleSideBar} className={linkClasses}>
            <FaUserShield /> Users
          </NavLink>

          <NavLink to="/admin/orders" onClick={toggleSideBar} className={linkClasses}>
            <FaClipboardList /> Orders
          </NavLink>

          <NavLink to="/admin/returns" onClick={toggleSideBar} className={linkClasses}>
            <FaUndoAlt /> Returns
          </NavLink>

          <div className='mt-4 border-t pt-2'>
            <button onClick={handleLogout} className='w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-red-100 text-red-600'>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
