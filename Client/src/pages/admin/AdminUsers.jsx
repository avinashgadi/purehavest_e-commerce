import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin/allusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.log("Failed to fetch users: ", error);
    } finally {
      setLoading(false);
    }
  }

  const deleteUsers = async (id) => {
    if(!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API}/admin/allusers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.log("User deletion failed: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>All Users</h2>
      {loading ? (
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:gris-cols-3'>
          {users.map((user) => (
            <div key={user._id} className='bg-white border rounded shadow p-4'>
              <h3 className='text-lg font-semibold'>{user.name}</h3>
              <p className='text-sm text-gray-600'>{user.email}</p>
              <p className='text-sm text-gray-500'>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <div className='flex gap-4'>
                <button
                  onClick={() => deleteUsers(user._id)}
                  className="mt-4 text-sm bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => navigate(`/admin/user/${user._id}/orders`)}
                  className='mt-4 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                >
                  View Orders
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminUsers
