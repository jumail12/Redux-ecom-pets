import React from "react";

const Slider = () => {
  const imageUrls = [
    "https://cdn.pixabay.com/photo/2020/03/31/19/20/dog-4988985_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg",   
    "https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_960_720.jpg",
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
