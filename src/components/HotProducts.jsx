import React, { useEffect } from 'react';
import { FetchHotProducts } from '../sliceLogic/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './Product reusable comp/ProductItem';
import DogBedOffer from './Carousel/DogBedOffer';

const HotProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchHotProducts());
    }, [dispatch]);

    const { hotDeals } = useSelector((state) => state.pro);

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-15 bg-gray-200">
            {/* Section Header */}
            <div className="py-4 flex gap-4">
                <div className="w-6 bg-black h-10 rounded"></div>
                <h1 className="text-2xl md:text-3xl font-bold text-red-600">
                    Hot Deals🔥
                </h1>
            </div>

            {/* Advertisement Banner */}
            <div className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white p-6 rounded-lg mb-6 text-center shadow-lg">
                <h2 className="text-2xl font-semibold">Limited Time Offer!</h2>
                <p className="mt-2 text-lg">
                    Grab the best deals on dog beds and accessories. 
                    Discounts up to <span className="font-bold">hot</span>!
                </p>
            </div>

            {/* Hot Deals Grid */}
            {hotDeals?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {hotDeals.map((beds) => (
                        <ProductItem key={beds.productId} product={beds} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">No products found</p>
            )}

            {/* Carousel / Additional Offer */}
            <DogBedOffer />
        </div>
    );
};

export default HotProducts;
