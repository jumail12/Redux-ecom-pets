import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { fetchProductById } from '../../sliceLogic/ProductSlice';



const ProD = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const { id } = useParams();

      useEffect(() => {
              dispatch(fetchProductById(id));
          }, [dispatch]);

    const {product}=useSelector(state=>state.pro);







    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <ToastContainer />
        <div className="w-11/12 max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-96 md:h-auto">
            <img
             src={product.imageUrl}
             alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>
      
          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <button
              onClick={() => navigate(-1)} // Navigate back
              className="mb-4 bg-green-200 text-green-700 px-3 py-1 rounded hover:bg-green-300 transition-all self-start"
            >
             
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-green-700">{product.productName}</h2>
              <div className="flex justify-center items-center">
                    <p className="text-gray-600 line-through mr-2">₹{product.productPrice}</p>
                    <p className="text-gray-600 font-bold">₹{product.offerPrize}</p>
                </div>
      
              {/* Rating Section */}
              <div className="mt-4 text-lg">
                <span className="text-yellow-500">
                  {'★'.repeat(Math.floor(product.rating))}{/* Filled stars */}
                  {'☆'.repeat(5 - Math.floor(product.rating))}{/* Empty stars */}
                </span>
                <span className="text-gray-500 font-medium ml-2">{product.rating}/5</span>
              </div>
      
              <p className="text-gray-600 text-sm mt-6 leading-relaxed">
                {product.productDescription}
              </p>
            </div>
      
            {/* Add to Cart Button */}
            <button
              // onClick={async () => await addTocart(product)}
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
