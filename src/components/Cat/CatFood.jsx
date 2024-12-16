import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredProducts_ } from "../../sliceLogic/ProductSlice";

import CatFoodOffer from "../Carousel/CatFoodOffer";
import ProductItem from "../Product reusable comp/ProductItem";


const CatFood = () => {
    const dispatch = useDispatch();

    // Fetch cat-food products when the component mounts
    useEffect(() => {
        dispatch(filteredProducts_('cat-food'));
    }, [dispatch]);

    // Get filtered products from Redux store
    const { filteredProducts } = useSelector((state) => state.pro);
    
    

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-15 bg-gray-200">
            <div className="py-4 flex gap-4">
                <div className="w-6 bg-black h-10 rounded"></div>
                <h1 className="text-2xl md:text-3xl font-bold">Cat Food</h1>
            </div>

            {filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((food) => (
                        <ProductItem key={food.productId} product={food} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">No products found</p>
            )}

            <CatFoodOffer />
        </div>
    );
};

export default CatFood;
