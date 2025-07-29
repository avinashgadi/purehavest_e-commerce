import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../../components/contexts/cartContext';

function Cart() {
  const navigate = useNavigate(); 
  const { cartItems, updateCartItem, deleteCartItem } = useCart();

  const handleProceedToPay = () => {
    navigate('/checkout', {
      state: { amount: totalAmount },
    });
  };

  const deliveryFee = 20;
  const platformFee = 5;
  const itemsTotal = (cartItems || []).reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalAmount = itemsTotal + deliveryFee + platformFee;

  return (
    <div className="max-w-md mx-auto px-4 md:pt-24 pt-18 font-medium text-sm">
      <button onClick={() => navigate(-1)} className="text-xs text-white cursor-pointer mb-2 py-1 px-3 bg-red-500 hover:bg-red-700   rounded">Back</button>
      <h2 className="text-center text-lg mb-4 font-semibold">Order Details</h2>
      <div className="border border-gray-300 rounded-md p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🕒</span>
          <p className="text-green-700 font-medium">Delivery in 10 mins</p>
        </div>
        {!cartItems ? (
          <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
        ) : (
          cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-4">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Unit: {item.product.unit}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button onClick={() => item.quantity > 1 && updateCartItem(item._id, item.quantity - 1)} className="border px-2 text-center cursor-pointer">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItem(item._id, item.quantity + 1)} className="border px-2 cursor-pointer">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-700 font-semibold">₹{item.product.price * item.quantity}</p>
                  <FaTrash onClick={() => deleteCartItem(item._id)} className="text-gray-500 cursor-pointer mt-2" />
                </div>
              </div>
            )) 
          )
        )}
      </div>
      
      <div className="border border-gray-300 rounded-md p-4 mb-6">
        <h3 className="text-center mb-3 font-medium">Order Summary</h3>
        <div className="flex justify-between text-green-700 mb-2">
          <span>Items Total :</span>
          <span className="text-black">₹{itemsTotal}</span>
        </div>
        <div className="flex justify-between text-green-700 mb-2">
          <span>Delivery Fee :</span>
          <span className="text-black">₹{deliveryFee}</span>
        </div>
        <div className="flex justify-between text-green-700 mb-2">
          <span>Platform Fee :</span>
          <span className="text-black">₹{platformFee}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold italic text-orange-600 mt-3">
          <span>Total Amount :</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleProceedToPay}
          className="bg-green-700 hover:bg-green-800 text-white italic px-6 py-2 rounded cursor-pointer"
        >
          Proceed to Pay
        </button>
      </div>

      <div className="bg-[#f0f5e9] text-center italic text-sm p-3 rounded mb-6 text-green-900">
        “If damaged or spoiled, return within 24 hours for a refund”
      </div>
    </div>
  );
}

export default Cart;
