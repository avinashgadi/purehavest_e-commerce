import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../components/contexts/AuthContext';

function MyProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", price: "", category: "", quantity: "", description: "", image: null,
  });
  const [message, setMessage] = useState('');

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/farmers/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.log("Failed to fetch products: " + error);
    }
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API}/farmers/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.log("Failed to delete product: ", error);
    }
  }

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name, price: product.price, category: product.category, quantity: product.quantity, description: product.description || '', image: null,
    });
    setMessage('');
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("description", formData.description);
    if(formData.image) data.append("image", formData.image);

    try {
      await axios.patch(`${API}/farmers/products/${editProduct._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      setMessage("Product updated successfully");
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.log("Failed to update product: " + error);
      setMessage("Failed to update product.");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>My Products</h2>
      {products.length === 0 ? (
        <p className='text-gray-500'>No products found</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div key={product._id} className='border p-4 rounded shadow bg-white'>
              <img src={product.image} alt={product.name} className='h-40 w-full object-cover mb-3 rounded' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-sm text-gray-700 mb-1'>₹ {product.price}</p>
              <p className='text-sm text-gray-500'>Category: {product.category}</p>
              <p className={`text-sm font-medium ${product.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: {product.status}
              </p>
              <div className='flex justify-between mt-3'>
                <button onClick={() => handleEditClick(product)} className='text-blue-600 underline text-sm hover:cursor-pointer'>Edit</button>
                <button onClick={() => handleDelete(product._id)} className='text-red-600 underline text-sm hover:cursor-pointer'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Product Name"
              required
            />

            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Price"
              required
            />

            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Category"
              required
            />

            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Quantity"
              required
            />

            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Description"
              rows="3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full mb-3"
            />

            {message && <p className="text-sm mb-3 text-center">{message}</p>}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default MyProducts
