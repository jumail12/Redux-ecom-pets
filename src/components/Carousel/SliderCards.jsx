import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SliderCards = () => {
  const products = useSelector((state) => state.pro.products);
  const filtered = products.filter((item) => item.rating > 4.3);

  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/prod/${id}`);
  };

  return (
    <div className="w-full bg-white p-4">
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {filtered.map((bed) => (
          <div
            onClick={() => handleProductClick(bed.id)}
            key={bed.id}
            className="min-w-[240px] bg-gray-100 border p-4 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            {/* Display the single image for each product */}
            <img
              src={bed.url}
              alt={bed.heading}
              className="w-full h-40 object-cover rounded-md mb-2"
            />

            <div className="p-2">
              <h2 className="text-md font-semibold text-gray-800 mb-1">
                {bed.heading}
              </h2>
              <p className="text-lg font-bold text-gray-700">${bed.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderCards;
