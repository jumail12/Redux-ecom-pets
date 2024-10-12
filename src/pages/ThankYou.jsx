import React, { useState, useEffect } from 'react';

const ThankYou = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show video after 1 second
    const timer1 = setTimeout(() => setShowVideo(true), 1000);

    // Show thank you text after 4 seconds (after video plays)
    const timer2 = setTimeout(() => setShowText(true), 7000);

    // Cleanup timers
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="thank-you-container flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Video Animation */}
      {showVideo && (
        <div className="video-container mb-6">
          <video
            width="500px"
            height="200px"
            autoPlay
            muted
            loop
           
            className="video-animation"
          >
            <source src="https://cdnl.iconscout.com/lottie/premium/thumb/order-complete-animation-download-in-lottie-json-gif-static-svg-file-formats--successful-transaction-completed-processed-purchase-confirmed-digital-marketing-pack-e-commerce-shopping-animations-8433699.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Thank You Message */}
      {showText && (
        <div className={`text-center ${showText ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-500">Your order has been successfully placed.</p>
          <p className="text-gray-500">We appreciate your purchase and will process it shortly.</p>
        </div>
      )}
    </div>
  );
};

export default ThankYou;
