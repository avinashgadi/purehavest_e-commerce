import React from 'react';
import milkImg from "../../../assets/milkbr.png"
import { useNavigate } from 'react-router-dom';

const FeaturedMilk = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-10 bg-white text-left pt-20">
      <div className="text-right">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition-all"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-6 border p-6 rounded-xl shadow-md">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold underline">Product Details</h2>
          <p><strong>Name:</strong> A2 Desi Cow Milk</p>
          <p><strong>Price:</strong> ₹40 per litre</p>
          <p><strong>Available:</strong> 100 litres</p>
          <p><strong>Harvest Date:</strong> Daily Fresh</p>
          <p><strong>Category:</strong> Dairy</p>
          <p><strong>Description:</strong> Unprocessed milk from grass-fed native Indian cows.</p>
          <p><strong>Shelf Life:</strong> 2 Days (Refrigerated)</p>
          <p><strong>Benefits:</strong>  High in A2 protein, easily digestible, calcium-rich.</p>
          <p><strong>Storage Instructions:</strong> Keep refrigerated</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold underline">Farmer & Farm Details</h2>
          <p><strong>Farmer Name:</strong> Ramesh Pawar</p>
          <p><strong>Farm Name:</strong> GreenLeaf Farms</p>
          <p><strong>Location:</strong> Sangli, Maharashtra</p>
          <p><strong>Verified:</strong> ✅ Verified Seller</p>
          <p><strong>Listed Since:</strong> March 2025</p>
          <p><strong>Orders Fulfilled:</strong> 120+</p>
          <p><strong>Farming Practices:</strong> “We grow using traditional organic techniques, compost fertilizers, and natural pest repellents.”</p>
          <p><strong>Farmer Story:</strong> “I started organic farming after seeing the harm chemicals did to my soil. Today, I grow food I’m proud to feed my own children — and yours.”</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10 p-6 border rounded-xl shadow-md">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-green-800 italic">Health Benefits of Honey</h2>
          <ul className="list-decimal pl-5 space-y-1">
            <li>Easier to digest than A1 milk</li>
            <li>Boosts brain and heart health</li>
            <li>Supports muscle repair and immunity</li>
            <li>Contains omega-3 fatty acids</li>
          </ul>
        </div>

        <img 
          src={milkImg} 
          alt="A2 Milk" 
          className="rounded-xl w-full max-h-[400px] object-cover"
        />
      </div>
    </section>
  );
};

export default FeaturedMilk;
