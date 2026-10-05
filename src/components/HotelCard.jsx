import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, ArrowRight } from 'lucide-react'

const HotelCard = ({ room, index = 0 }) => {
  if (!room) return null

  const isBestSeller = index % 2 === 0

  return (
    <Link
      to={`/rooms/${room.id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1.5"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={room.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'}
          alt={room.hotel?.name || 'Hotel Room'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bestseller Badge */}
        {isBestSeller && (
          <span className="absolute top-3 left-3 bg-orange-600/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Best Seller
          </span>
        )}

        {/* Room Type Tag */}
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {room.roomType}
        </span>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name and Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
            {room.hotel?.name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{room.hotel?.rating || '4.8'}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
          <MapPin size={14} className="text-orange-500 shrink-0" />
          <span className="truncate">{room.hotel?.address || room.hotel?.city}</span>
        </div>

        {/* Amenities Preview */}
        {room.amenities && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] text-gray-400 px-1 py-0.5">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">${room.pricePerNight}</span>
            <span className="text-xs text-gray-500 font-normal"> / night</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 group-hover:text-orange-700 transition-colors">
            Book Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
