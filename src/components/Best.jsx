import React, { useEffect } from 'react';
import { fetchProducts } from '../sliceLogic/ProductSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Best = () => {
    
    const products = useSelector((state) => state.pro.products);
  
    // Filter products for dog beds
    const filtered = products.filter((item) =>  item.rating >4.2);

   
    const nav=useNavigate()
    const proD=(id)=>{
        nav(`/prod/${id}`)
    }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
   
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((bed) => (
            <div
                key={bed.id}
                onClick={()=>proD(bed.id)}
                className="bg-white border cursor-pointer p-4 border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:shadow-xl"
            >
                {/* Display the single image for each dog bed */}
                <img
                    src={bed.url}
                    alt={bed.heading}
                    className="ml-3 w-40 h-25 object-fill"
                />

                <div className="p-4">
                    <h2 className="text-md font-semibold text-gray-800 mb-2">
                        {bed.heading}
                    </h2>
                    <p className="text-lg font-bold text-gray-700 mb-4">
                        ${bed.price}
                    </p>
                   
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default Best