import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Your order has been placed. Thank you!</p>
      <button onClick={() => navigate('/')} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
        Go to Home
      </button>
    </div>
  );
}

export default OrderSuccess;
