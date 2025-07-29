import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function AdminUserOrders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/admin/user/${id}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      } catch (error) {
        console.log("Failed to fetch user orders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Orders by user</h2>
        {loading ? (
          <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>  
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className='border p-4 mb-4 bg-white shadow rounded'>
              <p className='text-sm text-gray-700 mb-1'>Order ID: {order._id}</p>
              <p className='text-sm text-gray-600 mb-1'>Total: ₹ {order.total}</p>
              <p className='text-sm text-gray-600 mb-1'>Status: {order.status}</p>
              <div className='text-sm'>
                <h4 className='font-semibold'>Products:</h4>
                <ul className='list-disc ml-5'>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.product?.name} x {item.quantity} (₹{item.product?.price})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminUserOrders
