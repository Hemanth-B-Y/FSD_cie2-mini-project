import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cities } from '../assets/assets'
import { Search, Calendar, Users, MapPin, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const Hero = () => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date')
      return
    }

    // Build search query params
    const params = new URLSearchParams()
    if (destination) params.append('city', destination)
    if (checkIn) params.append('checkIn', checkIn)
    if (checkOut) params.append('checkOut', checkOut)
    if (guests) params.append('guests', guests.toString())

    toast.success(`Searching luxury stays in ${destination || 'all destinations'}...`)
    navigate(`/rooms?${params.toString()}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl w-full text-center mx-auto flex flex-col items-center">
        {/* Badge Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs sm:text-sm font-semibold mb-6 shadow-md animate-fade-in">
          <Sparkles size={15} />
          <span>The Ultimate Luxury Hotel Experience</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair tracking-tight leading-[1.15] mb-6 drop-shadow-md">
          Discover Your Perfect <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
            Getaway Destination
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-200 font-light leading-relaxed mb-10 drop-shadow">
          Reserve bespoke suites, private coastal villas, and high-floor penthouses curated with world-class amenities and 24/7 personal concierge.
        </p>

        {/* Booking Search Form (PrebuiltUI / GreatStack Specification) */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl bg-white/95 backdrop-blur-md text-gray-800 rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center"
        >
          {/* Destination Field with Datalist */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors">
            <MapPin size={20} className="text-orange-500 shrink-0" />
            <div className="flex-1 text-left">
              <label htmlFor="destination-input" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Destination
              </label>
              <input
                id="destination-input"
                list="destinations-list"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to? (e.g. Paris)"
                className="w-full bg-transparent text-sm font-semibold text-gray-900 focus:outline-none placeholder:font-normal placeholder:text-gray-400"
              />
              <datalist id="destinations-list">
                {cities.map((city, idx) => (
                  <option key={idx} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Check-In Date */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors">
            <Calendar size={20} className="text-orange-500 shrink-0" />
            <div className="flex-1 text-left">
              <label htmlFor="checkin-date" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Check In
              </label>
              <input
                id="checkin-date"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors">
            <Calendar size={20} className="text-orange-500 shrink-0" />
            <div className="flex-1 text-left">
              <label htmlFor="checkout-date" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Check Out
              </label>
              <input
                id="checkout-date"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Guests & Search Button */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-3 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-colors">
              <Users size={18} className="text-orange-500 shrink-0" />
              <div className="flex-1 text-left">
                <label htmlFor="guests-count" className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Guests
                </label>
                <input
                  id="guests-count"
                  type="number"
                  min="1"
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-xs font-semibold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              aria-label="Search Hotels"
              className="h-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all shadow-md hover:shadow-orange-600/30 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Hero
