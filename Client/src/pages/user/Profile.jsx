import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from "../../components/contexts/AuthContext.jsx";

function Profile() {
  const { token, user } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const [profile, setProfile] = useState({
    name: '', email: '', password: '',
  });
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, address } = res.data.user;
      setProfile((prev) => ({ ...prev, name, email }));
      if(address) setAddress(address);
    } catch (error) {
      console.log("Failed to fetch profile: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token) {
      fetchProfile();
    }
  }, [token]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: '', type: '' });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: '', type: '' });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = profile;
      await axios.patch(`${API}/users/updateProfile`, { name, email, password }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: "Profile updated successfully", type: "success" });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to update profile", type: "error" });
    }
  };

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API}/users/address`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: "Address updated successfully", type: "success" });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to update address", type: "error" });
    }
  };

  if(loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto mt-16 p-4 sm:p-6 lg:p-8'>
      <h2 className='text-2xl font-bold mb-6 text-center sm:text-left'>My Profile</h2>
      {message.text && (
        <div className={`mb-6 p-3 rounded text-sm text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleProfileUpdate} className='bg-white shadow rounded p-4 sm:p-6 mb-8'>
        <h3 className='text-lg font-semibold mb-4'>Basic Information</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1'>Name</label>
            <input type="text" name='name' value={profile.name} onChange={handleProfileChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>Email</label>
            <input type="email" name='email' value={profile.email} onChange={handleProfileChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div className='sm:col-span-2'>
            <label className='block mb-1'>New Password (optional)</label>
            <input type="password" name='password' value={profile.password} onChange={handleProfileChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
        </div>

        <button type='submit' className='mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto'>
          Update Profile
        </button>
      </form>

      <form onSubmit={handleAddressUpdate} className='bg-white shadow rounded p-4 sm:p-6'>
        <h3 className='text-lg font-semibold mb-4'>Shipping Address</h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-1'>Full Name</label>
            <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>Phone</label>
            <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>Street</label>
            <input type="text" name="street" value={address.street} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>City</label>
            <input type="text" name="city" value={address.city} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>State</label>
            <input type="text" name="state" value={address.state} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div>
            <label className='block mb-1'>Pincode</label>
            <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
          <div className='sm:col-span-2'>
            <label className='block mb-1'>Country</label>
            <input type="text" name="country" value={address.country} onChange={handleAddressChange} className='w-full p-2 border rounded border-green-600 focus:outline-none focus:border-green-700' />
          </div>
        </div>

        <button type="submit" className='mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto'>
          Update Address
        </button>
      </form>
    </div>
  )
}

export default Profile
