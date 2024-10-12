import React, { useState } from 'react';
import { useEffect } from 'react';



const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageUrls = [
        "https://image.chewy.com/catalog/cms/images/1441807_2024_06-HC_RxZoetisJunePromo-Multi-HHCB-LG._SY296__V1717021032_.jpeg",
        "https://image.chewy.com/catalog/cms/images/1513945_2024-08-IMC_FallCatFood-Mainstream-NonPromo-HHCB-LG._SY296__V1724361437_.jpeg",
        "https://image.chewy.com/catalog/cms/images/1368702_2024-07-IMC_Halloween-Shop-HHCB-LG-V2._SY296__V1722383140_.jpeg",
        "https://image.chewy.com/catalog/cms/images/1724750-2024-10-RoyalCanin-WeightManagement-05-HHCB-LG._SY296__V1728057919_.jpeg"
      ];
  
    const goToSlide = (index) => {
      setCurrentIndex(index);
    };
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };
  

  
    // Auto slide effect (optional)
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-screen h-[350px] mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
        >
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-screen h-[300px] object-cover"
            />
          ))}
        </div>
  
       
       
  
        {/* Dots navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {imageUrls.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  };

  export default Slider
  