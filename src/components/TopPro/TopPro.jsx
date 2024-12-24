import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from '../Product reusable comp/ProductItem';
import { FeturedPro } from '../../sliceLogic/ProductSlice';
import TopOffer11 from '../Carousel/TopOffer11 ';

const TopPro = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FeturedPro());
  }, [dispatch]);

  const {featuredPro}= useSelector((state)=>state.pro);

 
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-15 bg-gray-200">
       
      
      <div className="py-4   flex gap-4">
     
        <div className="w-6  bg-black h-10 rounded"></div>
        <h1 className="text-2xl md:text-3xl font-bold">featuredProducts</h1>
      </div>

      <div className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-6 rounded-lg mb-6 text-center shadow-lg">
                <h2 className="text-2xl font-semibold">Featured Products⭐</h2>
                <p className="mt-2 text-lg">
                    Explore our handpicked collection of premium items. 
                    Designed for comfort and style.
                </p>
                
            </div>

      {featuredPro.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredPro.map((pro) => (
            <ProductItem key={pro.productId} product={pro} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No products found</p>
      )}
     <TopOffer11/>
    </div>
  );
};

export default TopPro;
