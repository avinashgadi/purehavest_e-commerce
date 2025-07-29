import React, { useState } from 'react';
import { useCart } from '../../components/contexts/cartContext';
import { useAuth } from '../../components/contexts/AuthContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function CheckoutForm() {
  const { cartItems, setCartItems, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const API = import.meta.env.VITE_API_URL;

  const [selectedPayment, setSelectedPayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [showPopup, setShowPopup]= useState(false);

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${API}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data)
      setAddress(res.data.user.address);
    } catch (error) {
      console.log("Failed to fetch address: ", error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  const handlePlaceOrder = async () => {
    if(!selectedPayment) {
      alert('Please select a payment method.');
      return;
    }
    setLoading(true);
    try {
      const paymentRes = await axios.post(`${API}/payment/order`, {
        amount: amount,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const razorpayOrderId = paymentRes.data.orderId;

      const orderRes = await axios.post(`${API}/orders`, {
        items: cartItems.map(item => ({
          product: item.product?._id || item.product, quantity: item.quantity,
        })),
        totalAmount: amount,
        paymentMethod: selectedPayment,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = orderRes.data.orderDetails._id;

      setShowPopup(true);

      setTimeout(async () => {
        setShowPopup(false);
        await axios.patch(`${API}/orders/${orderId}/pay`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        clearCart();
        setTimeout(() => {
          navigate("/ordersuccess");
        }, 2000);
      }, 2000);
    } catch (error) {
      console.log("Payment or order failed: ", error);
      alert("Something went wrong during order placement.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto px-4 py-6 md:pt-24 text-sm font-medium">
      <p onClick={() => navigate(-1)} className="text-xs text-gray-600 cursor-pointer mb-4">&lt; Back</p>

      {/* Contact Details */}
      <div className="border border-green-700 rounded-md p-4 mb-6">
        <h2 className="text-center mb-4 font-medium">Contact Details</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded px-3 py-2 mb-3 text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Contact Number"
          className="w-full border rounded px-3 py-2 text-sm outline-none"
        />
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-bold mb-4 text-green-700">Processing Payment...</h2>
            <div className="h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full mx-auto"></div>
            <p className="mt-2 text-gray-600 text-sm">Please wait</p>
          </div>
        </div>
      )}

      <p onClick={() => navigate(-1)} className="text-xs text-gray-600 cursor-pointer mb-4">&lt; Back</p>

      {/* Delivery Address */}
      <div className="border border-green-700 rounded-md p-4 mb-6">
        <h2 className="text-center mb-4 font-medium">Shipping Address</h2>
        {address ? (
          <div className='space-y-1 text-gray-700 text-sm'>
            <p><strong>{address.fullName}</strong> - {address.phone}</p>
            <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
            <p>{address.country}</p>
          </div>
        ) : (
          <p className='text-center text-gray-500'>Loading address...</p>
        )}
      </div>

      {/* Payment Method */}
      <div className="border border-green-700 rounded-md p-4 mb-6">
        <h2 className="text-center mb-4 font-medium">Select Payment Method</h2>
        <div className="space-y-2">
          {["Cash on Delivery", "Netbanking", "UPI", "Pay Later", "Credit / Debit Card"].map(method => (
            <label key={method} className="flex justify-between items-center border rounded px-4 py-2 cursor-pointer">
              <span>{method}</span>
              <input type="radio" name="payment" value={method} onChange={(e) => setSelectedPayment(e.target.value)} checked={selectedPayment === method} />
            </label>
          ))}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-center">
        <button onClick={handlePlaceOrder} disabled={loading || !address} className="bg-green-700 hover:bg-green-800 text-white italic px-6 py-2 rounded">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
