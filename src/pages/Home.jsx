import React from 'react'
import Category from '../components/Category'
import Slider from '../components/Slider'
import VideoBanner from '../components/Carousel/VideoBanner'
import SliderCards from '../components/Carousel/SliderCards'




const Home = () => {
  return (
    <div>
      <Slider/>
      <Category/>
      <SliderCards/>
      <VideoBanner/>
    
       
    </div>
  )
}

export default Home