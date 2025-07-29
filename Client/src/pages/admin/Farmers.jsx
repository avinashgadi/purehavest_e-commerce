import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user_logo from "../../assets/user.png"
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get(`${API}/admin/allfarmers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFarmers(res.data.farmers);
      } catch (error) {
        console.log("Failed to fetch farmers: ", error);
      }
    }
    fetchFarmers();
  }, [token]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>All Farmers</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {farmers.map((farmer) => (
          <div key={farmer._id} className='border rounded-lg p-4 shadow hover:shadow-lg transition'>
            <div className='flex items-center gap-4'>
              <img src={farmer.avatar || user_logo} alt="avatar" className='w-20 h-20 rounded-full object-cover' />
              <div>
                <h2 className='text-lg font-semibold'>{farmer.name}</h2>
                <p className='text-sm text-gray-500'>{farmer.email}</p>
              </div>
            </div>
            <button onClick={() => navigate(`/admin/farmers/${farmer._id}`)} className='mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 hover:cursor-pointer'>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Farmers
