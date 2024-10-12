// DogLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import DogOffer from '../components/Carousel/DogOffer';

const DogLayout = () => {
    return (
        <div className="flex flex-col">
            {/* Navigation Bar with Gray Background */}
            <DogOffer/>
            <nav className="bg-gray-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/dog/dfood"
                                className="text-gray-700 hover:text-indigo-600 transition duration-300"
                            >
                                Dog Food
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dog/dbeds"
                                className="text-gray-700 hover:text-indigo-600 transition duration-300"
                            >
                                Dog Beds
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
    );
};

export default DogLayout;
