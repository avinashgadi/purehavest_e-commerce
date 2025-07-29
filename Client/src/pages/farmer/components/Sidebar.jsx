import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaPlus,
  FaBoxOpen,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../../../components/contexts/AuthContext';
import user_logo from "../../../assets/user.png"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/farmers/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.farmer);
      } catch (error) {
        console.log('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
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
    navigate('/login');
  };

  const toggleSideBar = () => setIsOpen((prev) => !prev);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded hover:bg-green-100 ${
      isActive ? 'bg-green-200 font-semibold' : ''
    }`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed z-50">
        <button onClick={toggleSideBar} className="text-2xl text-green-800">
          {isOpen ? <FaTimes /> : <FaChevronRight />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 p-4 h-screen w-64 fixed mt-[-3.5px] md:mt-0 z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile?.avatar || user_logo}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border mb-2"
          />
          <h2 className="text-lg font-bold text-green-700">
            {profile?.name || 'Farmer'}
          </h2>
          <p className="text-sm text-gray-500">{profile?.email || 'farmer@email.com'}</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <NavLink to="/farmer/add-product" onClick={toggleSideBar} className={linkClasses}>
            <FaPlus /> Add Product
          </NavLink>

          <NavLink to="/farmer/my-products" onClick={toggleSideBar} className={linkClasses}>
            <FaBoxOpen /> My Products
          </NavLink>

          <NavLink to="/farmer/orders" onClick={toggleSideBar} className={linkClasses}>
            <FaClipboardList /> Orders
          </NavLink>

          <NavLink to="/farmer/profile" onClick={toggleSideBar} className={linkClasses}>
            <FaUser /> Profile
          </NavLink>


          {/* Logout */}
          <div className="mt-4 border-t pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-red-100 text-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
