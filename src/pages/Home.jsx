import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import { roomsDummyData } from '../assets/assets'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Interactive Search */}
      <Hero />

      {/* 2. Featured Destinations */}
      <FeaturedDestination rooms={roomsDummyData} />

      {/* 3. Exclusive Offers */}
      <ExclusiveOffers />

      {/* 4. Guest Testimonials */}
      <Testimonial />

      {/* 5. Newsletter Subscription */}
      <Newsletter />
    </div>
  )
}

export default Home
