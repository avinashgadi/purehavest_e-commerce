import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const { token } = useAuth();

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(data.cart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${API}/cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error('Add to cart failed', error);
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      await axios.put(
        `${API}/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      await axios.delete(`${API}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    if(token) {
      fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, deleteCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);