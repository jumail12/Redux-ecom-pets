
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import CatOffer from '../components/Carousel/CatOffer';

const CatLayout = () => {
    const nav=useNavigate();

    const handleCategory=(str)=>{
        nav(`/cat/${str}`);
    }
  return (
    <div className="flex flex-col">
        <CatOffer/>
    {/* Navigation Bar with Gray Background */}
    <nav className="bg-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
            <ul className="flex space-x-6">
                <li>
                    
                    <button
                        onClick={()=>handleCategory("cat-food")}
                        className="text-gray-700 hover:text-indigo-600 transition duration-300"
                    >
                        Cat Food
                    </button>
                </li>
                <li>
                    <button
                        onClick={()=>handleCategory("cat-treat")}
                        className="text-gray-700 hover:text-indigo-600 transition duration-300"
                    >
                        Cat Treat
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    {/* Outlet for Nested Routes */}
    <div className="flex-grow p-8 bg-gray-100">
        <Outlet />
    </div>
</div>
  )
}

export default CatLayout