import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <img
        src="https://cdn.pixabay.com/photo/2024/07/20/17/12/warning-8908707_1280.png" // Replace with your pet-themed 404 image URL
        alt="Cute pet not found"
        className="w-48 h-48 mb-6 rounded-lg"
      />
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
