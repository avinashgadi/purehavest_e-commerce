import React from 'react';
import { useNavigate } from 'react-router-dom';

import fruitsImg from '../../../assets/fruits.png';
import vegetablesImg from '../../../assets/vegetables.png';
import dryFruitsImg from '../../../assets/dryfruits.png';
import dairyImg from '../../../assets/dairy.png';
import cerealsImg from '../../../assets/cereals.png';
import meatImg from '../../../assets/meat.png';
import spicesImg from '../../../assets/spices.png';

const categories = [
  { name: 'Fruits', image: fruitsImg },
  { name: 'Vegetables', image: vegetablesImg },
  { name: 'Dry Fruits', image: dryFruitsImg },
  { name: 'Dairy', image: dairyImg },
  { name: 'Cereals', image: cerealsImg },
  { name: 'Meat & Eggs', image: meatImg },
  { name: 'Spices', image: spicesImg },
];

function CategoryCarousel() {
  const navigate = useNavigate();

  return (
    <section className="p-4 sm:p-6 md:p-8 bg-white">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Shop by Categories</h2>
      
      <div className="flex overflow-x-auto gap-6 sm:gap-8 md:gap-10 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
            className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] max-w-[160px] snap-start flex-shrink-0 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 text-center p-3 hover:cursor-pointer"
          >
            <div className="h-24 sm:h-28 md:h-32 flex items-center justify-center mb-2">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-auto object-contain rounded"
              />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-800">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryCarousel;
