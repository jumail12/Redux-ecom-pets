import React from 'react'
import Category from '../components/Category'
import Slider from '../components/Slider'
import VideoBanner from '../components/Carousel/VideoBanner'
import SliderCards from '../components/Carousel/SliderCards'

import TopOffer10 from '../components/Carousel/TopOffer11 '
import TopOffer from '../components/Carousel/TopOffer'




const Home = () => {
  return (
    <div>
      
      <Slider/>
      <TopOffer />
      <Category/>
      <SliderCards/>
      <TopOffer10/>
    
      <VideoBanner/>
    
       
    </div>
  )
}

export default Home