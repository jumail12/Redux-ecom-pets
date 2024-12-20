import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  removeFromCart,
  fetchCart,
  decrementQty,
  incrementQty,
} from "../sliceLogic/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Payment from "./Payment";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch, token]);

  const { cart } = useSelector((state) => state.cartItems);

  const handleDelete = (id) => {
    dispatch(removeFromCart(id)).then(() => {
      dispatch(fetchCart()); // Fetch updated cart
      toast.warn("Item removed!");
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Your Cart
      </h1>

      {cart === null || cart.length === 0 ? (
        <div className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/06/11/50/shopping-cart-1026510_1280.jpg"
            alt="Empty Cart"
            className="w-1/3 h-auto mx-auto mb-6 object-cover"
          />
          <h2 className="text-lg text-gray-600 font-medium">
            Your cart is empty!
          </h2>
          <button
            onClick={() => navigate("/store")}
            className="mt-4 px-6 py-3 text-sm text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transform transition duration-300 ease-in-out"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items Section */}
         
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 shadow-lg rounded-xl space-y-4 h-full"
              >
                 <Link to={`/product/${item.productId}`}>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-32 h-32 object-cover mx-auto rounded-lg border border-gray-300 shadow-sm"
                />
                </Link>
                <div className="flex-grow text-center">
                  <h3
                    className="text-base font-semibold text-gray-900 truncate"
                    title={item.productName}
                  >
                    {item.productName}
                  </h3>
                  <p className="text-xs text-gray-700 line-through">
                    Original Price: ₹{item.orginalPrize}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Offer Price: ₹{item.price}
                  </p>
                  <div className="flex items-center justify-center space-x-4 mt-3">
                    <button
                      onClick={() =>
                        dispatch(decrementQty(item.productId)).then(() =>
                          dispatch(fetchCart())
                        )
                      }
                      className="px-3 py-2 border border-gray-400 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-200 transform transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(incrementQty(item.productId)).then(() =>
                          dispatch(fetchCart())
                        )
                      }
                      className="px-3 py-2 border border-gray-400 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-200 transform transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-2">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="mt-auto flex items-center justify-center px-4 py-3 text-xs text-red-600 bg-red-100 rounded-lg hover:bg-red-200 shadow-md transform transition-all duration-300"
                >
                  <MdDelete className="mr-2 text-lg" />
                  Remove Item
                </button>
              </div>
            ))}
          </div>
         

          {/* Cart Summary Section */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Price Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Items:</span>
                <span> ({cart.length})</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Price </span>
                <span>
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.orginalPrize * item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">
                  - ₹
                  {cart.reduce(
                    (acc, item) =>
                      acc + (item.orginalPrize - item.price) * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount Price </span>
                <span className="font-bold">
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>
                  ₹
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={() =>{
                navigate("/payment");
                <Payment cItems={cart} />
              }}
              className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transform transition duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
