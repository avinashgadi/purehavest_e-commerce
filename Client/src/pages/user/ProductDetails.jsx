import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useCart } from "../../components/contexts/cartContext";


const units = [
  { label: "1kg", value: 1 },
  { label: "3kgs", value: 3 },
  { label: "5kgs", value: 5 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(units[0].value);

  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if(loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='h-8 w-8 border-4 border-t-transparent border-green-600 animate-spin rounded-full'></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-red-600 text-2xl">
        Product not found
        <br />
        <button
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:pt-20">
      <button
        className="text-gray-600 mb-4 px-3 py-1 bg-red-200 rounded flex items-center gap-1 cursor-pointer hover:bg-red-600 hover:text-white duration-300"
        onClick={() => navigate(-1)}
      >
        <FaArrowAltCircleLeft /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 h-80 object-contain rounded-xl"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-lg text-green-700 font-semibold">
            {product.farmer?.name || "Verified Farmer"}
          </div>
          <h2 className="text-3xl font-bold uppercase">{product.name}</h2>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <p className="text-gray-600">{product.qty}</p>
          <p className="text-2xl text-green-800 font-bold">
            ₹{product.price} / {product.unit}
          </p>

          <div>
            <span className="font-medium underline">Select units:</span>
            <div className="flex gap-4 mt-2">
              {units.map((unit) => (
                <button
                  key={unit.value}
                  onClick={() => setSelectedUnit(unit.value)}
                  className={`px-5 py-2 border rounded-lg ${
                    selectedUnit === unit.value
                      ? "bg-green-100 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {unit.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => {
            addToCart(product._id, 1);
            navigate("/cart");
          }} className="mt-4 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="border p-6 rounded-xl bg-white">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <p><strong>Category:</strong> {product.category || "N/A"}</p>
          <p><strong>Description:</strong> {product.description || "Fresh farm product"}</p>
          <p><strong>Available:</strong> {product.stock || "50"} units</p>
        </div>
        <div className="border p-6 rounded-xl bg-white">
          <h3 className="text-xl font-semibold mb-4">Farmer Info</h3>
          <p><strong>Name:</strong> {product.farmer?.name || "N/A"}</p>
          <p><strong>Email:</strong> {product.farmer?.email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
