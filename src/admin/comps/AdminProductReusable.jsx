import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Import your Redux action for deleting a product
import { DeleteProduct, filteredProducts_ } from "../../sliceLogic/ProductSlice";

const AdminProductReusable = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(DeleteProduct(product.productId)).then(()=>{
      toast.success("Product deleted successfully!");
      dispatch(filteredProducts_(product.categoryName));
    });
   
  };

  return (
    <div
      key={product.productId}
      className="relative ml-10 w-[220px] p-2 border border-gray-300 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
    >
      <Link to={`/admin/products/${product.productId}`} className="block">
        {/* Adjust Image Size */}
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-36 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
        />
      </Link>
      <div className="relative mt-2 p-2">
        {/* Product Name with Two Lines */}
        <h2 className="text-sm font-semibold mb-2 line-clamp-2" title={product.productName}>
          {product.productName}
        </h2>

        <div className="flex justify-center items-center">
          <p className="text-gray-600 line-through mr-2">₹{product.productPrice}</p>
          <p className="text-gray-600 font-bold">₹{product.offerPrize}</p>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute bottom-2 left-2 right-2 px-4 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductReusable;
