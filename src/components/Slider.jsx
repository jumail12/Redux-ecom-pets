import React from "react";

const Slider = () => {
  const imageUrls = [
    "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/01/02/23/55/dog-5883275_1280.jpg",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-auto">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Slide Image ${index + 1}`}
          className="w-full h-[300px] object-cover"
        />
      ))}
    </div>
  );
};

export default Slider;
