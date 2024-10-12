// src/components/ProductItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/prod/${product.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white border cursor-pointer p-4 border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:shadow-xl"
        >
            <img
                src={product.url}
                alt={product.heading}
                className="ml-3 w-40 h-25 object-fill"
            />
            <div className="p-4">
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                    {product.heading}
                </h2>
                <p className="text-lg font-bold text-gray-700 mb-4">
                    ${product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
