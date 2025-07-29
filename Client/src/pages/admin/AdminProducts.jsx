import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const API = import.meta.env.VITE_API_URL;
  const { token } = useAuth();

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${API}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/products/${id}/${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllProducts();
    } catch (error) {
      console.log("Status update falied: ", error);
    }
  };

  const deleteProduct = async (id) => {
    if(!window.confirm('Are you sure you want to delete this product')) return;
    try {
      await axios.delete(`${API}/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllProducts();
    } catch (error) {
      console.log("Product delete failed: ", error);
    }
  };

  const filteredProducts = products.filter((p) => (
    statusFilter ? p.status === statusFilter : true
  ));

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-4 gap-4'>
        <h2 className='text-xl font-bold mb-4'>All Products</h2>
        <div className='mb-4'>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className='border px-4 py-2 rounded w-full sm:w-60'>
            <option value=''>All Products</option>
            <option value='approved'>Approved</option>
            <option value='pending'>Pending</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      ) : filteredProducts.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredProducts.map((product) => (
            <div key={product._id} className='bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              <div className='relative h-56 overflow-hidden'>
                <img 
                  src={product.image || 'https://placehold.co/400x300?text=No+Image'} 
                  alt={product.name} 
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' 
                />
              </div>
              <div className='p-4'>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Price: ₹{product.price}</p>
                <p className="text-sm mb-3">Status: <span className="capitalize font-medium">{product.status}</span></p>
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Farmer:</span> {product.farmer?.name} <br />
                  <span className="font-semibold">Email:</span> {product.farmer?.email}
                </p>
                <div className='flex gap-2 mt-4'>
                  <button
                    onClick={() => updateStatus(product._id, "approve")}
                    disabled={product.status === "approved"}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() => updateStatus(product._id, "reject")}
                    disabled={product.status === "rejected"}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    <FaTimes />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProducts
