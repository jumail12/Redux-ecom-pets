import React, { useEffect } from "react";
import { filteredProducts_ } from "../../sliceLogic/ProductSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";


export const FilteredPro = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.pro);

  console.log(category);
  
  useEffect(() => {
    dispatch(filteredProducts_(category));
  }, [dispatch, category]);

  const handleWishlist = async (productId) => {};
  const isProductInWishlist = (productId) => {
    // return wishlistItems.some((item) => item.productId === productId);
  };

  return <div>
       <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-32 bg-gray-200">
        <div className="py-4 flex gap-4">
          <div className="w-6 bg-black h-10 rounded"></div>
          <h1 className="text-2xl md:text-3xl font-bold">{category} Products</h1>
        </div>

        {filteredProducts?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.productId}
                className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
              >
                <Link to={`/product/${item.productId}`} className="block">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
                  />
                </Link>
                <button
                  onClick={() => handleWishlist(item.productId)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
                >
                  {isProductInWishlist(item.productId) ? (
                    <AiFillHeart size={24} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart size={24} className="text-gray-500" />
                  )}
                </button>
                <div className="relative mt-2">
                  <h2 className="text-lg font-semibold mb-2">{item.productName}</h2>
                  <div className="flex justify-center items-center">
                     <p className="text-gray-600 line-through mr-2">₹{item.productPrice}</p> {/* Original price with strikethrough */}
                     <p className="text-gray-600">₹{item.offerPrize}</p> {/* Offer price */}
                    </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No products found</p>
        )}
      </div>
  </div>;
};
