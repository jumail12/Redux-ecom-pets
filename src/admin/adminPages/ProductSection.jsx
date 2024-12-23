import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ProductSection = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
         <Link
              to={"/admin"}
              className="text-blue-500 hover:underline mb-6 inline-block"
            >
              {"< Back to Admin Panel"}
            </Link>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Product Categories
      </h2>
      
      <div className="flex justify-center space-x-8 mb-8">
        {/* Navigation Links for different categories */}
        <Link
          to="/admin/products/dog-food"
          className="text-lg text-blue-500 hover:underline hover:text-blue-700"
        >
          Dog Food
        </Link>

        <Link
          to="/admin/products/dog-beds"
          className="text-lg text-blue-500 hover:underline hover:text-blue-700"
        >
          Dog Beds
        </Link>

        <Link
          to="/admin/products/cat-food"
          className="text-lg text-blue-500 hover:underline hover:text-blue-700"
        >
          Cat Food
        </Link>

        <Link
          to="/admin/products/cat-treat"
          className="text-lg text-blue-500 hover:underline hover:text-blue-700"
        >
          Cat Treats
        </Link>
      </div>
      
      {/* Render the category-specific content here */}
      <Outlet />
    </div>
  );
};

export default ProductSection;
