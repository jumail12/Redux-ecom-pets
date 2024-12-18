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
      dispatch(addedToCart(id));
      toast.success("Item added to the cart!");
    } catch (err) {
      toast.warn(err.message);
    }
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate(`/cart`);
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 flex flex-col items-center">
      {/* Go Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-100 text-green-700 px-6 py-3 rounded-lg hover:bg-green-200 transition-all"
        >
          ← Go Back
        </button>
      </div>

      {/* Product Details */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden border border-gray-300">
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-72 md:h-auto p-4 flex justify-center items-center">
          <img
            src={product?.imageUrl}
            alt={product?.productName}
            className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-green-800 mb-3">
              {product?.productName}
            </h2>

            {/* Pricing */}
            <div className="flex items-center mb-4">
              <p className="text-gray-400 line-through mr-3 text-lg">
                ₹{product?.productPrice}
              </p>
              <p className="text-green-600 font-semibold text-xl">
                ₹{product?.offerPrize}
              </p>
            </div>

            {/* Rating Section */}
            <div className="mt-4 mb-4">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(Math.floor(product?.rating || 0))}
                {"☆".repeat(5 - Math.floor(product?.rating || 0))}
              </span>
              <span className="ml-2 text-gray-600 text-sm">
                ({product?.rating || 0}/5)
              </span>
            </div>

            {/* Product Description */}
            <p className="text-gray-700 text-md mt-4 leading-relaxed">
              {product?.productDescription || "No description available."}
            </p>
          </div>

          {/* Add to Cart Button */}
          {!isInCart ? (
            <button
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all"
              onClick={() => handleCart(product.productId)}
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={goToCart}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition-all"
            >
              Go to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDetails;
