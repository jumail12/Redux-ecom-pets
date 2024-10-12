
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import CatOffer from '../components/Carousel/CatOffer';

const CatLayout = () => {
  return (
    <div className="flex flex-col">
        <CatOffer/>
    {/* Navigation Bar with Gray Background */}
    <nav className="bg-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
            <ul className="flex space-x-6">
                <li>
                    
                    <Link
                        to="/cat/cfood"
                        className="text-gray-700 hover:text-indigo-600 transition duration-300"
                    >
                        Cat Food
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cat/ctreat"
                        className="text-gray-700 hover:text-indigo-600 transition duration-300"
                    >
                        Cat Treat
                    </Link>
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