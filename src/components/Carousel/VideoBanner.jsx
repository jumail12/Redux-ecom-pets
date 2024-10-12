import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoBanner = () => {
    const nav=useNavigate();
  return (
    <div className="w-screen h-[350px] relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src="https://static.petness.pt/media/10/banners/banner_1718195558_ciZe3PDp.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Optional text or overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Special Offer</h1>
          <p className="text-lg mt-2">Get the best deals on your favorite pet products!</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" onClick={()=>nav("/store")}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
