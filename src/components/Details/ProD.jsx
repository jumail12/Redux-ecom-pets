import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../sliceLogic/ProductSlice'; // Ensure this is the correct path
import { cartGet } from '../../sliceLogic/cartSlice';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const ProD = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()



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
        <div className="container mt-5 mx-auto p-6 bg-gray-50 shadow-lg rounded-lg max-w-2xl">
        <ToastContainer/>
        <button 
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="mb-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all shadow"
        >
            &lt; 
        </button>
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6">
            {/* Product Image */}
            <div className="md:w-1/2">
                <img
                    src={product.url}
                    alt={product.heading}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                />
            </div>
    
            {/* Product Info */}
            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{product.heading}</h2>
                    <h1 className="text-2xl font-bold text-blue-900 mt-2">${product.price}</h1>
    
                    {/* Rating Section */}
                    <div className="mt-2">
                        <span className="text-yellow-500">
                            {/* Assuming product.rating is a number between 0 and 5 */}
                            {'★'.repeat(Math.floor(product.rating))}{/* Filled stars */}
                            {'☆'.repeat(5 - Math.floor(product.rating))}{/* Empty stars */}
                        </span>
                        <span className="text-gray-600 font-semibold ml-2"> {product.rating}/5</span>
                    </div>
    
                    <p className="text-gray-600 text-sm mt-4">{product.discription}</p>
                </div>
    
                {/* Add to Cart Button */}
                <button onClick={async () => await addTocart(product)} className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all shadow hover:shadow-lg">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
    
    );
};

export default ProD;
