import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const { login } = useAuth();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setMessage({ text: 'Email and password are required.', type: 'error' });
      return;
    }

    try {
      const endpoint =
        form.role === 'farmer'
          ? `${API}/farmers/login`
          : `${API}/users/login`;

      const res = await axios.post(endpoint, {
        email: form.email,
        password: form.password,
      });

      login(res.data.user, res.data.token, form.role);

      setMessage({ text: 'Login successful. Redirecting...', type: 'success' });

      setTimeout(() => {
        if (form.role === 'admin') navigate('/admin');
        else if (form.role === 'farmer') navigate('/farmer');
        else navigate('/');
      }, 1500);
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || 'Login failed. Please try again.';
      setMessage({ text: msg, type: 'error' });
    }
  };

  return (
    <div className="mt-16 md:mt-24 md:p-6 p-2">
      <h2 className="md:text-3xl text-xl text-center font-medium mb-4">Welcome Back!</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto border-4 border-green-700 rounded-xl md:p-10 p-4 shadow">
        {message.text && (
          <div className={`mb-4 p-3 rounded text-center text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <label htmlFor="email" className="md:text-2xl text-lg">Email</label>
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

        <label htmlFor="password" className="md:text-2xl text-lg mt-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Type here"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-1 mt-2 p-2 border-1 rounded border-green-500 focus:outline-none focus:border-green-600"
        />

        <label htmlFor="role" className="md:text-2xl text-lg mt-2">Role</label>
        <select
          name="role"
          id="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 mt-2 p-3 pr-10 border border-green-500 rounded focus:outline-none bg-white text-gray-800"
        >
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded mt-2 cursor-pointer hover:bg-green-700 duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
