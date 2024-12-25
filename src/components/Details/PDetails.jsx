import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetchProductById } from "../../sliceLogic/ProductSlice";
import { addedToCart, fetchCart } from "../../sliceLogic/cartSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const PDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idd } = useParams();
  const token = Cookies.get("token");

  const { product } = useSelector((state) => state.pro);
  const [isInCart, setIsCart] = useState(false);
  const { cart } = useSelector((st) => st.cartItems);

  useEffect(() => {
    dispatch(fetchProductById(idd));
  }, [dispatch, idd]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const itemInCart = cart?.some((a) => a.productId === product.productId);
    setIsCart(itemInCart);
  }, [cart, product.productId]);

  // Handle adding product to the cart
  const handleCart = (id) => {
    try {
      if (!token) {
        toast.warn("Please login to use the cart!");
        return;
      }
      setIsCart((pr) => !pr);
      dispatch(addedToCart(id)) // Add to cart
        .then(() => {
          toast.success("Item added to the cart!");
          dispatch(fetchCart()) // Fetch updated cart
        });
    } catch (err) {
      toast.warn(err.message);
    }
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate(`/cart`);
  };

  // Handle Buy Now functionality
  const handleBuyNow = (id) => {
    try {
      if (!token) {
        toast.warn("Please login to proceed with the purchase!");
        return;
      } else {
        navigate(`/payment`, { state: { productId: id } });
      }
    } catch (err) {
      toast.error("Unable to process your request. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      {/* Go Back Button */}
      <div className="w-full max-w-6xl flex justify-start mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
        >
          ← Go Back
        </button>
      </div>

      {/* Product Details */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-300">
        {/* Product Image */}
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center bg-gray-50">
          <img
            src={product?.imageUrl}
            alt={product?.productName}
            className="max-w-full max-h-96 object-contain rounded-lg hover:scale-105 transform transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {product?.productName}
            </h2>

            {/* Pricing */}
            <div className="flex items-center mb-6">
              <p className="text-gray-400 line-through mr-4 text-lg">
                ₹{product?.productPrice}
              </p>
              <p className="text-green-600 font-bold text-2xl">
                ₹{product?.offerPrize}
              </p>
            </div>

            {/* Rating Section */}
            <div className="flex items-center mb-6">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(Math.floor(product?.rating || 0))}
                {"☆".repeat(5 - Math.floor(product?.rating || 0))}
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                ({product?.rating || 0}/5)
              </span>
            </div>

            {/* Product Description */}
            <p className="text-gray-700 text-md mb-6 leading-relaxed">
              {product?.productDescription || "No description available."}
            </p>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="space-y-4">
            {!isInCart ? (
              <>
                <button
                  className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-all duration-200"
                  onClick={() => handleCart(product.productId)}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-200"
                  onClick={() => handleBuyNow(product.productId)}
                >
                  Buy Now
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={goToCart}
                  className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-all duration-200"
                >
                  Go to Cart
                </button>
                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-200"
                  onClick={() => handleBuyNow(product.productId)}
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDetails;
