import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import { addOrRemoveWishlist, fetchwishlist } from "../../sliceLogic/WishListSlice";


const ProductItem = ({ product }) => {
    const dispatch=useDispatch();

    const [isInWishlist, setIsInWishlist] = useState(false);

    // Toggle wishlist status
    const handleWishlist = (id) => {
        setIsInWishlist((prevState) => !prevState);
        dispatch(addOrRemoveWishlist(id))
        // dispatch(fetchwishlist());
    };

    return (
        <div
            key={product.productId}
            className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
        >
            <Link to={`/product/${product.productId}`} className="block">
                <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
                />
            </Link>
            <button
                onClick={()=>handleWishlist(product.productId)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
            >
                {isInWishlist ? (
                    <AiFillHeart size={24} className="text-red-500" />
                ) : (
                    <AiOutlineHeart size={24} className="text-gray-500" />
                )}
            </button>
            <div className="relative mt-2">
                <h2 className="text-md font-semibold mb-2">{product.productName}</h2>
                <div className="flex justify-center items-center">
                    <p className="text-gray-600 line-through mr-2">₹{product.productPrice}</p>
                    <p className="text-gray-600 font-bold">₹{product.offerPrize}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;

