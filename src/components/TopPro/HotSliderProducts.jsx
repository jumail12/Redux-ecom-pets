import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchHotProducts } from '../../sliceLogic/ProductSlice';
import { Link, useNavigate } from 'react-router-dom';

const HotSliderProducts = () => {
    const dispatch = useDispatch();
const nav=useNavigate();
    useEffect(() => {
        dispatch(FetchHotProducts());
    }, [dispatch]);

    const { hotDeals } = useSelector((state) => state.pro);

    // State to track the current slide index (manual navigation only)
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? hotDeals.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % hotDeals.length
        );
    };

    return (
        <div className="bg-gray-100 p-8">
            {/* Advertisement Banner */}
            <div className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-8 rounded-xl text-center shadow-xl mb-6">
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Exclusive Deals Await!</h2>
    <p className="mt-3 text-xl">
        Grab unbelievable discounts on the latest trending products! 
        Don't miss out on these 
        <span className="font-semibold"> blazing hot offers</span>.
    </p>
    <button 
        className="mt-6 px-8 py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 shadow-lg transition ease-in-out transform hover:scale-105" 
        onClick={() => nav("/hot")}
    >
        Explore the Store
    </button>
</div>


            {/* Slider */}
            {hotDeals?.length > 0 ? (
                <div className="relative group overflow-hidden rounded-lg shadow-md bg-white">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {hotDeals.map((product) => (
                          
                            <div
                                key={product.productId}
                                className="flex-shrink-0 w-full sm:w-[50%] md:w-[25%] p-4"
                            >
                                  <Link to={`/product/${product.productId}`}>
                                <div className="bg-gray-50 rounded-lg shadow-md p-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.productName}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="mt-3">
                                        <h3 className="text-base font-semibold line-clamp-2">
                                            {product.productName}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                                            {product.productDescription}
                                        </p>
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-red-600 font-bold text-sm">
                                                ₹{product.offerPrize}
                                            </span>
                                            <span className="line-through text-gray-400 text-xs">
                                                ₹{product.productPrice}
                                            </span>
                                        </div>
                                        <button className="mt-4 w-full py-1.5 text-sm bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
                                            View Product
                                        </button>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900 group-hover:visible transition-opacity"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900 group-hover:visible transition-opacity"
                    >
                        &#10095;
                    </button>
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500 mt-6">
                    No products found
                </p>
            )}
        </div>
    );
};

export default HotSliderProducts;
