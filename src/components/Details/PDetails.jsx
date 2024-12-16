import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchProductById } from '../../sliceLogic/ProductSlice';

const PDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idd } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(idd));
  }, [dispatch, idd]);

  const { product } = useSelector((state) => state.pro);

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 flex flex-col items-center">
      {/* Go Back Button - Positioned on the Left */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 transition-all"
        >
          ← Go Back
        </button>
      </div>

      {/* Main Product Container */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={product?.imageUrl}
            alt={product?.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-green-700">{product?.productName}</h2>
            <div className="flex items-center mt-2">
              <p className="text-gray-400 line-through mr-3">₹{product?.productPrice}</p>
              <p className="text-gray-800 font-bold text-lg">₹{product?.offerPrize}</p>
            </div>

            {/* Rating Section */}
            <div className="mt-4">
              <span className="text-yellow-500 text-lg">
                {'★'.repeat(Math.floor(product?.rating || 0))}
                {'☆'.repeat(5 - Math.floor(product?.rating || 0))}
              </span>
              <span className="ml-2 text-gray-500 text-sm">({product?.rating || 0}/5)</span>
            </div>

            {/* Product Description */}
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {product?.productDescription || "No description available."}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded shadow-lg hover:bg-green-600 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDetails;
