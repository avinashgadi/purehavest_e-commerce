import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    address: {
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      setErrors((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: '',
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }

    setMessage({ text: '', type: '' });
  };


  const validate = () => {
    const newErrors = {};
    const addressErrors = {};

    if(!form.name.trim()) newErrors.name = 'Name is required';
    if(!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if(!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if(!form.password.trim()) newErrors.password = 'Password is required';
    if(!['user', 'farmer'].includes(form.role)) {
      newErrors.role = 'Please select a role';
    }

    if(!form.role) {
      newErrors.role = 'Role is required';
    }

    if(form.role === "user") {
      const { address } = form;
      if(!address.fullName?.trim()) addressErrors.fullName = 'Full name is required';
      if(!address.phone?.trim()) addressErrors.phone = 'Phone number is required';
      if(!address.street?.trim()) addressErrors.street = 'Full name is required';
      if(!address.city?.trim()) addressErrors.city = 'City is required';
      if(!address.state?.trim()) addressErrors.state = 'State is required';
      if(!address.pincode?.trim()) addressErrors.pincode = 'Pincode is required';
      if(!address.country?.trim()) addressErrors.country = 'Country is required';
  
      if(Object.keys(addressErrors).length > 0) newErrors.address = addressErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;
    try {
      const endpoint = form.role === 'farmer' ? `${API}/farmers/register` : `${API}/users/register`;

      await axios.post(endpoint, form);
      setMessage({ text: 'Registered Successfully! Redirecting to login...', type: 'success' });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage({ text: 'Registration failed. Please try again.', type: 'error' });
    }
  }
  return (
    <div className="mt-16 md:mt-24 md:p-6 p-2">
      <h2 className="md:text-3xl text-xl text-center font-medium mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto border-4 border-green-700 rounded-xl md:p-10 p-4 shadow'>
        {message.text && (
          <div className={`mb-4 p-3 rounded text-center text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} >
            {message.text}
          </div>
        )}
        <label htmlFor="name" className='md:text-2xl text-lg'>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Type here"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-1 mt-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
        />
        {errors.name && <p className='text-red-500 text-sm mb-2'>{errors.name}</p>}
        <label htmlFor="email" className='md:text-2xl text-lg'>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Type here"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-1 mt-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
        />
        {errors.email && <p className='text-red-500 text-sm mb-2'>{errors.email}</p>}
        <label htmlFor="password" className='md:text-2xl text-lg'>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          placeholder="Type here"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-1 mt-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
        />
        {errors.password && <p className='text-red-500 text-sm mb-2'>{errors.password}</p>}
        <label htmlFor="role" className='md:text-2xl text-lg'>Role</label>
        <select
          name="role"
          id="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-1 mt-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
        >
          <option value="role">Select Role</option>
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
        </select>
        {errors.role && <p className='text-red-500 text-sm mb-2'>{errors.role}</p>}

        {form.role === 'user' && (
          <>
            <p className='md:text-2xl text-lg mb-2'>Address</p>
            <input
              type="text"
              id="address_name"
              autoComplete="address_name"
              name="address.fullName"
              placeholder="Full Name"
              value={form.address.fullName}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.fullName && <p className="text-red-500 text-sm mb-2">{errors.address.fullName}</p>}

            <input
              type="tel"
              id="address_phone"
              autoComplete='address_phone'
              name="address.phone"
              placeholder="Phone"
              value={form.address.phone}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.phone && <p className="text-red-500 text-sm mb-2">{errors.address.phone}</p>}

            <input
              type="text"
              id="address_street"
              autoComplete='address_street'
              name="address.street"
              placeholder="Street"
              value={form.address.street}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.street && <p className="text-red-500 text-sm mb-2">{errors.address.street}</p>}

            <input
              type="text"
              id="address_city"
              autoComplete='address_city'
              name="address.city"
              placeholder="City"
              value={form.address.city}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.city && <p className="text-red-500 text-sm mb-2">{errors.address.city}</p>}

            <input
              type="text"
              id="address_state"
              autoComplete='address_state'
              name="address.state"
              placeholder="State"
              value={form.address.state}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.state && <p className="text-red-500 text-sm mb-2">{errors.address.state}</p>}

            <input
              type="number"
              id="address_pincode"
              autoComplete='address_pincode'
              name="address.pincode"
              placeholder="Pincode"
              value={form.address.pincode}
              onChange={handleChange}
              className="w-full mb-1 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.pincode && <p className="text-red-500 text-sm mb-2">{errors.address.pincode}</p>}

            <input
              type="text"
              id="address_country"
              autoComplete='address_country'
              name="address.country"
              placeholder="Country"
              value={form.address.country}
              onChange={handleChange}
              className="w-full mb-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
            />
            {errors.address?.country && <p className="text-red-500 text-sm mb-2">{errors.address.country}</p>}
          </>
        )}

        <button
          type='submit'
          className="w-full bg-green-600 text-white p-2 rounded mt-2 cursor-pointer hover:bg-green-700 duration-300"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{' '} <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
