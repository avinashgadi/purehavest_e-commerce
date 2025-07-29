import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.patch(`${API}/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (error) {
      console.log("Failed to update status: ", error);
    }
  };

  const filteredOrders = statusFilter === "all"
  ? orders
  : orders.filter(order => order.status === statusFilter);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <h1 className='text-xl font-bold mb-4'>All Orders</h1>
        <div className='mb-4'>
          <label htmlFor="statusFilter" className='font-medium mr-2'>Filter By Status:</label>
          <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='border px-4 py-2 rounded w-full sm:w-60'>
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className='space-y-4'>
          {filteredOrders.map((order) => (
            <div key={order._id} className='bg-white border rounded p-4 shadow-sm'>
              <p className='text-sm text-gray-600 mb-1'>Order ID: {order._id}</p>
              <p className='text-sm text-gray-600 mb-1'>User: {order.user?.name} ({order.user?.email})</p>
              <p className='text-sm text-gray-600 mb-1'>Status: <span className="capitalize font-semibold">{order.status}</span></p>
              <p className='text-sm text-gray-600 mb-1'>Created: {new Date(order.createdAt).toLocaleString()}</p>

              <div className='mt-2'>
                <p className='font-semibold'>Items:</p>
                <ul className='ml-4 list-disc text-sm text-gray-700'>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.product?.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-4 flex gap-2 flex-wrap'>
                {["confirmed", "shipped", "delivered"].map((s) => {
                  const currentStatus = order.status;
                  const statusRank = { confirmed: 1, shipped: 2, delivered: 3 };
                  const isDisabled = statusRank[s] <= statusRank[currentStatus];
                  return (
                    <button key={s} 
                      onClick={() => updateStatus(order._id, s)}
                      disabled={isDisabled}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        isDisabled ? "bg-gray-400 cursor-not-allowed" :
                        s === "confirmed" ? "bg-blue-500 hover:bg-blue-600" :
                        s === "shipped" ? "bg-yellow-500 hover:bg-yellow-600" :
                        "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Mark as {s}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
