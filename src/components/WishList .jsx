import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFromWishlist, fetchwishlist } from "../sliceLogic/WishListSlice";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const WishList = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchwishlist());
  }, [dispatch,fetchwishlist()]);

  const wishlistItems = useSelector((state) => state.wish.wishlistItems);

  const handleDelete = (id) => {
    dispatch(RemoveFromWishlist(id));
    dispatch(fetchwishlist());
    toast.warn("Item removed!");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative"
            >
              <button
                onClick={() => nav(`/product/${item.productId}`)}
                className="block mb-4 relative"
              >
                {/* Adjust Image Fit */}
                <div className="w-full h-56 overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </div>

                {/* Product Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.productName}</h2>
                <p className="text-gray-500 text-sm mb-1">{item.categoryName}</p>

                {/* Price */}
                <p className="text-gray-800 line-through text-md mt-1">₹{item.price}</p>
                <p className="text-indigo-600 font-bold text-lg mt-1">₹{item.offerPrice}</p>
              </button>

              {/* Delete Button */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => handleDelete(item.productId)}
                aria-label="Delete item"
              >
                <MdDelete size={24} />
              </button>

              {/* Add to Cart Button */}
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
