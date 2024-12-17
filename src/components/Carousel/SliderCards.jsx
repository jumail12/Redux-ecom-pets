import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FeturedPro } from "../../sliceLogic/ProductSlice";

const SliderCards = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4); // Start with 4 products shown

  useEffect(() => {
    dispatch(FeturedPro()); // Fetch the featured products on mount
  }, [dispatch]);

  const { featuredPro } = useSelector((state) => state.pro);

  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Show 4 more products on click
  };

  return (
    <div className="w-full bg-white px-4 py-6">
      {/* Header Section */}
      <div className="py-4 flex items-center gap-4">
        <div className="w-6 bg-black h-10 rounded"></div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Featured Products
        </h1>
      </div>

      {/* Horizontal Product Slider */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-4">
        {featuredPro.map((product) => (
          <div
            key={product.productId}
            className="min-w-[240px] bg-gray-100 border p-4 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
          >
            <Link to={`/product/${product.productId}`}>
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            </Link>
            <div>
              <h2 className="text-md font-semibold text-gray-800 truncate mb-1">
                {product.productName}
              </h2>
              <p className="text-lg font-bold text-gray-600">
                ${product.offerPrize}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* "Show More" Button */}
      {visibleCount < featuredPro.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={showMoreProducts}
            className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default SliderCards;
