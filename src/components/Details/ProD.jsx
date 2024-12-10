import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../sliceLogic/ProductSlice'; // Ensure this is the correct path
import { cartGet } from '../../sliceLogic/cartSlice';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const ProD = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    // Select products from the Redux store
    const products = useSelector((state) => state.pro.products);

    // Get product ID from URL params
    const { id } = useParams();

    // User login
    const user = localStorage.getItem("id");

    const addTocart = async (item) => {
        try {
            if (user) {
                await dispatch(cartGet(item)); // Unwrapping to handle the result
            } else {
                toast.info("Please log in first.");
            }
        } catch (error) {
            console.log("Error adding item to cart", error);
            toast.warn("Failed to add item to the cart. Please try again.");
        }
    };

    // Ensure products are available before searching for the product
    if (!products || products.length === 0) {
        return <div className="text-center">Loading products...</div>;
    }

    // Find the product by ID
    const product = products.find((item) => item.id === id);

    if (!product) {
        return <div className="text-center">Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <ToastContainer />
        <div className="w-11/12 max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-96 md:h-auto">
            <img
              src={product.url}
              alt={product.heading}
              className="w-full h-full object-cover"
            />
          </div>
      
          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <button
              onClick={() => navigate(-1)} // Navigate back
              className="mb-4 bg-green-200 text-green-700 px-3 py-1 rounded hover:bg-green-300 transition-all self-start"
            >
              &lt; Back
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-green-700">{product.heading}</h2>
              <h1 className="text-3xl font-bold text-green-800 mt-2">${product.price}</h1>
      
              {/* Rating Section */}
              <div className="mt-4 text-lg">
                <span className="text-yellow-500">
                  {'★'.repeat(Math.floor(product.rating))}{/* Filled stars */}
                  {'☆'.repeat(5 - Math.floor(product.rating))}{/* Empty stars */}
                </span>
                <span className="text-gray-500 font-medium ml-2">{product.rating}/5</span>
              </div>
      
              <p className="text-gray-600 text-sm mt-6 leading-relaxed">
                {product.discription}
              </p>
            </div>
      
            {/* Add to Cart Button */}
            <button
              onClick={async () => await addTocart(product)}
              className="mt-8 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    );
};

export default ProD;
