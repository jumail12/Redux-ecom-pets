import React, { useEffect } from 'react';
import { fetchProducts } from '../../sliceLogic/ProductSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ProductItem from '../Product reusable comp/ProductItem';
import CatFoodOffer from '../Carousel/CatFoodOffer';


const CatFood = () => {

  // Select products from the Redux store
  const products = useSelector((state) => state.pro.products);

  // Filter products for dog beds
  const filtered = products.filter((item) =>  item.catogory === "cat-food");

  
  const nav=useNavigate()
  const proD=(id)=>{
      nav(`/prod/${id}`)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            {/* <h1 className="text-5xl font-bold text-gray-900 text-center mb-8">Food</h1> */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((food) => (
                    <ProductItem key={food.id} product={food} />
                ))}
            </div>
            <CatFoodOffer/>
        </div>
  )
}

export default CatFood