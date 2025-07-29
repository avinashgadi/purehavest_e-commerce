import React from 'react';
import Heroimg from '../../../assets/hero-section.png';
import Leaves from '../../../assets/leaves.png';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8F3DF] w-full min-h-screen px-4 sm:px-6 md:px-16 py-10 md:pt-36 pt-24 relative overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-green-600 text-base sm:text-lg mb-2">100% Organic Products</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            Fresh from the <span className="italic font-semibold text-green-700">Farm</span> to
            <br className="hidden sm:block" />
            Your <span className="italic font-semibold text-green-700">Doorstep</span>!
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center md:justify-start">
            <button
              onClick={() => navigate("/products")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md w-full sm:w-auto cursor-pointer duration-300"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md w-full sm:w-auto cursor-pointer duration-300"
            >
              Become Seller
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1 max-w-[600px] w-full relative">
          <img
            src={Heroimg}
            alt="Hero"
            className="w-full md:h-96 relative z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
