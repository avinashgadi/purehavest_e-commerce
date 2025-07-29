import React from 'react';
import oilImg from "../../../assets/gn-oil.png"
import { useNavigate } from 'react-router-dom';

const FeaturedOil = () => {
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
          <p><strong>Name:</strong> Cold-Pressed Groundnut Oil</p>
          <p><strong>Price:</strong> ₹220 per litre</p>
          <p><strong>Available:</strong>75 bottles</p>
          <p><strong>Harvest Date:</strong> June 2025</p>
          <p><strong>Category:</strong> Oil</p>
          <p><strong>Description:</strong> Cold-pressed from sun-dried groundnuts.</p>
          <p><strong>Shelf Life:</strong> 6 Months</p>
          <p><strong>Benefits:</strong> Preserves natural nutrients, Supports cholesterol balance, Ideal for deep frying and salads.</p>
          <p><strong>Storage Instructions:</strong> Cool, dry place away from sunlight</p>
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
            <li><strong>Rich in Vitamin C</strong> – Boosts immunity and helps fight infections.</li>
            <li><strong>High in Antioxidants</strong> – Protects cells from oxidative stress.</li>
            <li><strong>Supports Digestion</strong> – Contains actinidin enzyme and dietary fiber.</li>
            <li><strong>Improves Skin Health</strong> – Promotes collagen production and reduces dryness.</li>
            <li><strong>Good for Heart Health</strong> – Helps manage blood pressure and cholesterol.</li>
            <li><strong>Aids Sleep</strong> – Contains serotonin, which may improve sleep quality.</li>
            <li><strong>Low in Calories</strong> – Ideal for weight-conscious and diabetic-friendly diets.</li>
          </ul>
        </div>

        <img 
          src={oilImg} 
          alt="Groundnut Oil" 
          className="rounded-xl w-full max-h-[400px] object-cover"
        />
      </div>
    </section>
  );
};

export default FeaturedOil;
