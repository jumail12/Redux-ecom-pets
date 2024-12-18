import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import {
  removeFromCart,
  fetchCart,
  decrementQty,
  incrementQty,
} from "../sliceLogic/cartSlice"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch,fetchCart()]);

  const { cart, totalPrice } = useSelector((state) => state.cartItems);

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
    dispatch(fetchCart());
    toast.warn("Item removed!");
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Your Cart</h1>

      {cart === null || cart.length === 0 ? (
        <div className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/11/06/11/50/shopping-cart-1026510_1280.jpg"
            alt="Empty Cart"
            className="w-1/3 h-auto mx-auto mb-6 object-cover"
          />
          <h2 className="text-2xl text-gray-600 font-medium">Your cart is empty!</h2>
          <button
            onClick={() => navigate("/store")}
            className="mt-6 px-8 py-4 text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transform transition duration-300 ease-in-out"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col bg-white p-6 shadow-xl rounded-xl space-y-4 transform transition duration-500 hover:scale-105"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-24 h-24 object-cover mx-auto rounded-md"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.productName}</h3>
                  <p className="text-gray-600">Price: ₹{item.offerprice}</p>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={async () => await dispatch(decrementQty(item.productId))}
                      className="px-4 py-2 border border-gray-300 rounded-full text-xl text-gray-600 bg-white hover:bg-gray-100 transform transition duration-300 ease-in-out"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={async () => await dispatch(incrementQty(item.productId))}
                      className="px-4 py-2 border border-gray-300 rounded-full text-xl text-gray-600 bg-white hover:bg-gray-100 transform transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold text-gray-900 mt-3">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="mt-3 w-full px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transform transition duration-300 ease-in-out"
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>

          {/* Proceed to Payment Button */}
          <div className="mt-10 text-center">
            <button
              onClick={() =>
                cart.length > 0
                  ? navigate("/payment")
                  : toast.info("Your cart is empty!")
              }
              className="w-full px-8 py-3 border-2 border-teal-500 text-teal-500 font-semibold rounded-full hover:bg-teal-500 hover:text-white transform transition duration-300 ease-in-out"
            >
              Proceed to Payment - ₹{totalPrice}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
