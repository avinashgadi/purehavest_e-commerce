import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext';

function Profile() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/farmers/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.farmer.name,
          email: res.data.farmer.email,
          password: '',
        });
        setPreview(res.data.farmer.avatar || '');
      } catch (error) {
        console.log("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if(file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (formData.avatar) data.append("avatar", formData.avatar);

      const res = await axios.patch(`${API}/farmers/updateprofile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || 'Profile updated successfully!');
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (error) {
      console.log(error);
      setMessage("Update failed");
    }
  }
  return (
    <div className='p-6 max-w-md mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>My Profile</h2>
      {message && (
        <div className='mb-4 text-sm text-green-700 bg-green-100 px-4 py-2 rounde'>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
        {preview && (
          <img src={preview} alt="avatar" className='w-20 h-20 rounded-full object-cover mx-auto' />
        )}
        <input
          type="file"
          name="avatar"
          onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="New Password (optional)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Profile
