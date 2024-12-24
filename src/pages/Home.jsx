import React from 'react'
import Category from '../components/Category'
import Slider from '../components/Slider'
import VideoBanner from '../components/Carousel/VideoBanner'
import SliderCards from '../components/Carousel/SliderCards'
import Cookies from 'js-cookie';
import TopOffer10 from '../components/Carousel/TopOffer11 '
import TopOffer from '../components/Carousel/TopOffer'
import HotSliderProducts from '../components/TopPro/HotSliderProducts'




const Home = () => {
    const role = Cookies.get('role');

    if (role === 'Admin') {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Unauthorized</h1>
        </div>
      );
    }
  return (
    <div>
      
      <Slider/>
      {/* <TopOffer /> */}
      <Category/>
      <SliderCards/>
      <TopOffer10/>
    <HotSliderProducts/>
      <VideoBanner/>
    
       
    </div>
  )
}

export default Home