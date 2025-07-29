import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function FarmerProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const fetchProductsByFarmer = async () => {
    try {
      const farmerRes = await axios.get(`${API}/admin/allfarmers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmer(farmerRes.data.farmer);

      const res = await axios.get(`${API}/admin/farmer/${id}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch products: ", error);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (productId, status) => {
    const url = `${API}/admin/products/${productId}/${status}`;
    try {
      await axios.patch(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProductsByFarmer();
    } catch (error) {
      console.log(`Failed to update product: `, error);
    }
  };

  const deleteProduct = async (productId) => {
    if(!window.confirm('Are you sure you wamt to delete this product')) return;
    
    try {
      await axios.delete(`${API}/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProductsByFarmer();
    } catch (error) {
      console.log("Delete failed: ", error);
    }
  };

  const filteredProducts = products.filter((p) => (
    statusFilter ? p.status === statusFilter : true
  ));

  useEffect(() => {
    fetchProductsByFarmer();
  }, [id]);

  return (
    <div className='p-4'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-4 gap-4'>
        <h1 className='text-xl font-bold'>
          Products by {farmer?.name}
        </h1>
        <select value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='border px-4 py-2 rounded w-full sm:w-60'
        >
          <option value="">All Products</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {filteredProducts.map((p) => (
            <div key={p._id} className='bg-white shadow-md rounded-lg p-4 border'>
              <img src={p.image || 'https://placehold.co/300x200?text=No+Image'} alt={p.name} className='w-full h-40 object-cover' />
              <div className='mb-2'>
                <h2 className='text-lg font-semibold text-green-700'>{p.name}</h2>
                <p className='text-gray-600'>₹ {p.price}</p>
                <p className='text-sm text-gray-500 capitalize'>Status: {p.status}</p>
              </div>
              <div className='flex gap-2 mt-2'>
                <button
                  onClick={() => updateStatus(p._id, "approve")}
                  disabled={p.status === "approved"}
                  className='bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50'
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => updateStatus(p._id, "reject")}
                  disabled={p.status === "rejected"}
                  className='bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50'
                >
                  <FaTimes />
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className='bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700'
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FarmerProducts
