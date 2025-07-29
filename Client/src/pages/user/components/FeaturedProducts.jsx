import React from 'react';
import honeyImg from '../../../assets/honeybr.png';
import milkImg from '../../../assets/milkbr.png';
import gnOil from "../../../assets/gn-oil.png"
import { useNavigate } from 'react-router-dom';
const FeaturedProducts = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-12 px-4 md:px-10">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12">
        Featured Products
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="bg-[#F3F1E5]  rounded-2xl flex-1 p-6 flex flex-col justify-between text-center">
          <div>
            <img src={honeyImg} alt="Honey" className="mx-auto w-48  mb-4" />
            <h3 className="text-2xl font-semibold">Pure Forest Honey</h3>
            <p className="text-green-700 mt-2">Golden Sweetness, Naturally</p>
          </div>
          <button onClick={() => navigate("/featured/honey")} className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 cursor-pointer">
            View
          </button>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          <div className="bg-[#F3F1E5] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-right">
            <img src={milkImg} alt="Milk" className="w-58 md:h-46 md:w-76" />
            <div className="flex flex-col  items-end gap-2 md:pr-6 pb-4">
              <h3 className="md:text-3xl text-2xl font-medium">A2 Desi Cow Milk</h3>
              <p className="text-gray-700">— Pure, Unprocessed, Nutrient-Rich</p>
              <button onClick={() => navigate("/featured/milk")} className="bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer">
                View
              </button>
            </div>
          </div>

          <div className="bg-[#F3F1E5] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-right">
            <img src={gnOil} alt="Milk" className="w-58 md:h-46 md:w-76" />
            <div className="flex flex-col  items-end gap-2 md:pr-6 pb-4">
              <h3 className="md:text-3xl text-2xl font-medium">Cold-Pressed Groundnut Oil</h3>
              <p className="text-gray-700">— Healthy Cooking Starts Here</p>
              <button onClick={() => navigate("/featured/oil")} className="bg-green-700 text-white px-6 py-2 rounded-lg cursor-pointer">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

