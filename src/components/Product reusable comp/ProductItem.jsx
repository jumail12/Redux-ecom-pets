import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveWishlist,
  fetchwishlist,
} from "../../sliceLogic/WishListSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const { wishlistItems } = useSelector((state) => state.wish);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchwishlist());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const productInWishlist = wishlistItems.some(
      (item) => item.productId === product.productId
    );
    setIsInWishlist(productInWishlist);
  }, [wishlistItems, product.productId]);

  const handleWishlist = (id) => {
    if (!token) {
      toast.warn("Please login to use the wishlist!");
      return;
    }
    setIsInWishlist((prev) => !prev);
    dispatch(addOrRemoveWishlist(id));
  };

  return (
    <div
      key={product.productId}
      className="relative ml-10 w-[220px] p-2 border border-gray-300 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
    >
      <Link to={`/product/${product.productId}`} className="block">
        {/* Adjust Image Size */}
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-36 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
        />
      </Link>

      {/* Wishlist Icon */}
      <button
        onClick={() => handleWishlist(product.productId)}
        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
      >
        {isInWishlist ? (
          <AiFillHeart size={24} className="text-blue-500" />
        ) : (
          <AiOutlineHeart size={24} className="text-gray-500" />
        )}
      </button>

      <div className="relative mt-2 p-2">
        {/* Product Name with Two Lines */}
        <h2
          className="text-sm font-semibold mb-2 line-clamp-2"
          title={product.productName}
        >
          {product.productName}
        </h2>

        <div className="flex justify-center items-center">
          <p className="text-gray-600 line-through mr-2">
            ₹{product.productPrice}
          </p>
          <p className="text-gray-600 font-bold">₹{product.offerPrize}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
