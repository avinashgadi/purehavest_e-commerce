import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../components/contexts/cartContext';


// Category images
import fruitsImg from '../../assets/fruits.png';
import vegetablesImg from '../../assets/vegetables.png';
import dryFruitsImg from '../../assets/dryfruits.png';
import dairyImg from '../../assets/dairy.png';
import cerealsImg from '../../assets/cereals.png';
import meatImg from '../../assets/meat.png';
import spicesImg from '../../assets/spices.png';

const categories = [
  { name: 'Fruits', image: fruitsImg },
  { name: 'Vegetables', image: vegetablesImg },
  { name: 'Dry Fruits', image: dryFruitsImg },
  { name: 'Dairy', image: dairyImg },
  { name: 'Grains', image: cerealsImg },
  { name: 'Meat & Eggs', image: meatImg },
  { name: 'Spices', image: spicesImg },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || categories[0].name);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        
        <aside className="hidden md:block w-full md:w-1/8 bg-white sticky md:top-[70px] z-10 overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-70px)] md:py-4 md:m-0 mt-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`p-4 md:w-full w-20 text-center hover:bg-green-100 hover:cursor-pointer duration-300 ${
                selectedCategory === cat.name ? 'bg-green-300 font-semibold' : ''
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div className="flex flex-col items-center">
                <img src={cat.image} className="h-8 w- mb-1" alt={cat.name} />
                <span className="text-sm">{cat.name}</span>
              </div>
            </button>
          ))}
        </aside>

        <div className='md:hidden flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory mt-18'>
          {categories.map((cat) => (
          <div
            key={cat.name}
            className={`min-w-[120px] max-w-[160px] snap-start flex-shrink-0 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 text-center p-3 hover:cursor-pointer ${
              selectedCategory === cat.name ? 'bg-green-300 font-semibold' : ''
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <div className="h-8 flex items-center justify-center mb-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-auto object-contain rounded"
              />
            </div>
            <p className="text-[10px] font-medium text-gray-800">{cat.name}</p>
          </div>
        ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:pt-20 overflow-x-hidden">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Shop {selectedCategory}</h2>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600">No products available in this category.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border md:p-4 p-2 flex flex-col items-center hover:shadow-lg transition-all"
                >
                  <div onClick={() => handleCardClick(product)} className="cursor-pointer text-center">
                    <img
                      src={product.image || fruitsImg}
                      alt={product.name}
                      className="w-24 h-24 object-contain mb-4 rounded-md"
                    />
                    <div className="md:text-lg text-sm font-medium mb-1">{product.name}</div>
                    <div className="text-gray-700 md:text-lg text-sm font-semibold mb-2">₹{product.price} / {product.unit}</div>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(product._id, 1);
                      navigate("/cart");
                    }}
                    className="bg-green-700 text-white md:px-6 py-2 px-4 text-sm rounded-lg w-full mt-2 hover:bg-green-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
