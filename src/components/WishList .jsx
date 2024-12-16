import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFromWishlist, fetchwishlist } from "../sliceLogic/WishListSlice";
import {  useNavigate } from "react-router-dom"; // Ensure proper import
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const WishList = () => {
  const nav=useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchwishlist());
  }, [dispatch,fetchwishlist()]);

  const  wishlistItems= useSelector((state) => state.wish.wishlistItems);

  const handleDelete = (id) => {
  dispatch(RemoveFromWishlist(id));
    dispatch(fetchwishlist());
    toast.warn("Item removed!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
      {wishlistItems.length == 0 ? (
        <p className="text-center text-gray-500">
          Your wishlist is currently empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow"
            >
              <button onClick={()=>nav(`/product/${item.productId}`)} className="block mb-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.productName}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  {item.categoryName}
                </p>
                <p className="text-gray-900 line-through text-md mt-1">
                  ₹{item.price}
                </p>
                <p className="text-gray-900 font-bold text-lg mt-1">
                  ₹{item.offerPrice}
                </p>
              </button>

              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => handleDelete(item.productId)}
                aria-label="Delete item"
              >
                {/* <MdDelete size={24} /> */}
                remove
              </button>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
