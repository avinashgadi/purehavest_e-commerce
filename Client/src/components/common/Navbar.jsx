import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pureharvestlogo.png";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const handleUserRedirect = () => {
    if (!isAuthenticated) return navigate("/login");

    if (user?.role === "admin") navigate("/admin");
    else if (user?.role === "farmer") navigate("/farmer");
    else navigate("/profile");

    setMenuOpen(false);
  };

  const handleCartClick = () => {
    if (!isAuthenticated || user?.role !== "user") return navigate("/login");

    navigate("/cart");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const isUser = user?.role === "user";
  const isGuest = !user;

  return (
    <nav className="bg-white border-b border-gray-300 px-4 md:px-8 py-4 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          <img src={logo} alt="" className='md:h-12 h-8' />
        </div>

        {/* Hamburger Icon */}
        {(isUser || isGuest || isAuthenticated) && (
          <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        )}

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          {(isUser || isGuest) && (
            <div className="flex items-center border border-black rounded-full px-4 py-2 w-[300px] lg:w-[500px] bg-white">
              <FaSearch className="text-black" />
              <input
                type="text"
                placeholder="Search here"
                className="border-none outline-none ml-2 w-full text-gray-500"
              />
            </div>
          )}

          {(isUser || isGuest) && (
            <FaShoppingCart 
              className="text-xl cursor-pointer" 
              onClick={handleCartClick} 
            />
          )}

          <FaUser 
            className="text-xl cursor-pointer" 
            onClick={handleUserRedirect} 
            />

          {isUser && (
            <button onClick={() => {navigate("/orders"); setMenuOpen(false);}} className='text-sm text-gray-700 hover:text-green-700 font-medium cursor-pointer'>
              Orders
            </button>
          )}

          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/register")}
              className="border border-green-600 text-green-600 rounded-lg px-4 py-2  cursor-pointer hover:bg-green-700 hover:text-white duration-300"
            >
              Sign Up
            </button>
          ) : (
            <>
              <span className="font-medium sm:inline-block capitalize">
                Welcome, {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold border border-red-500 px-4 py-1 rounded hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {/* Search Bar */}
          {(isUser || isGuest) && (
            <div className="flex items-center border border-black rounded-full px-4 py-2 bg-white">
              <FaSearch className="text-black" />
              <input
                type="text"
                placeholder="Search here"
                className="border-none outline-none ml-2 w-full text-gray-500"
              />
            </div>
          )}

          {(isUser || isGuest) && (
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleCartClick}
            >
              <FaShoppingCart className="text-xl" />
              <span>Cart</span>
            </div>
          )}


          {/* Account/Profile Link */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleUserRedirect}
            >
            <FaUser className="text-xl" />
            <span>Account</span>
          </div>

            {isUser && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/orders");
                  setMenuOpen(false);
                }}
              >
                <span>My Orders</span>
              </div>
            )}
          {!isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="border border-green-600 text-green-600 rounded-lg px-4 py-2 w-full"
            >
              Sign Up
            </button>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <span className="font-medium capitalize">
                Welcome, {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold border border-red-500 px-4 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
