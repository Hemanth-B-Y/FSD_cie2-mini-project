import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'
import HotelCard from './HotelCard'
import { roomsDummyData } from '../assets/assets'
import { ArrowRight } from 'lucide-react'

const FeaturedDestination = ({ rooms = roomsDummyData }) => {
  const navigate = useNavigate()
  const featuredRooms = rooms.slice(0, 4)

  const handleViewAll = () => {
    navigate('/rooms')
    window.scrollTo(0, 0)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          badge="Featured Collection"
          title="Featured Destinations"
          subtitle="Explore our handpicked collection of world-renowned luxury suites, villas, and boutique hotels offering bespoke experiences."
        />

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
          {featuredRooms.map((room, index) => (
            <HotelCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-gray-900 font-semibold text-sm border border-gray-300 shadow-sm hover:border-orange-500 hover:text-orange-600 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>View All Destinations</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedDestination
