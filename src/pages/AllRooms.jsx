import React, { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  roomsDummyData,
  roomTypes,
  priceRanges,
  sortOptions,
  facilityIcons
} from '../assets/assets'
import StarRating from '../components/StarRating'
import {
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Search,
  Wifi,
  Waves,
  Coffee,
  Wind,
  Sparkles,
  Dumbbell,
  Car,
  BellRing,
  Sun,
  Tv,
  Check
} from 'lucide-react'

// Helper to map facility icon name to Lucide component
const getAmenityIcon = (name) => {
  switch (facilityIcons[name]) {
    case 'wifi': return <Wifi size={13} />
    case 'waves': return <Waves size={13} />
    case 'coffee': return <Coffee size={13} />
    case 'wind': return <Wind size={13} />
    case 'sparkles': return <Sparkles size={13} />
    case 'dumbbell': return <Dumbbell size={13} />
    case 'car': return <Car size={13} />
    case 'bell-ring': return <BellRing size={13} />
    case 'sun': return <Sun size={13} />
    case 'tv': return <Tv size={13} />
    default: return <Sparkles size={13} />
  }
}

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // State initialization from URL query or defaults
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedSort, setSelectedSort] = useState('Newest First')
  const [openFilters, setOpenFilters] = useState(false)

  // Toggle room type selection
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // Toggle price range selection
  const handlePriceRangeToggle = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    )
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCity('')
    setSearchQuery('')
    setSelectedTypes([])
    setSelectedPriceRanges([])
    setSelectedSort('Newest First')
    setSearchParams({})
  }

  // Advanced Filtering and Sorting Engine
  const filteredRooms = useMemo(() => {
    return roomsDummyData
      .filter((room) => {
        // 1. Text Search Filter (name, city, address)
        const query = searchQuery.toLowerCase().trim()
        if (query) {
          const matchName = room.hotel.name.toLowerCase().includes(query)
          const matchCity = room.hotel.city.toLowerCase().includes(query)
          const matchAddress = room.hotel.address.toLowerCase().includes(query)
          if (!matchName && !matchCity && !matchAddress) return false
        }

        // 2. City Filter from search params
        if (selectedCity && room.hotel.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false
        }

        // 3. Room Type Checkboxes
        if (selectedTypes.length > 0 && !selectedTypes.includes(room.roomType)) {
          return false
        }

        // 4. Price Ranges Filter
        if (selectedPriceRanges.length > 0) {
          const price = room.pricePerNight
          const matchesAnyRange = selectedPriceRanges.some((range) => {
            if (range === '0 - 150') return price <= 150
            if (range === '150 - 300') return price > 150 && price <= 300
            if (range === '300 - 500') return price > 300 && price <= 500
            if (range === '500 - 1000') return price > 500 && price <= 1000
            if (range === '1000+') return price > 1000
            return true
          })
          if (!matchesAnyRange) return false
        }

        return true
      })
      .sort((a, b) => {
        if (selectedSort === 'Price: Low to High') return a.pricePerNight - b.pricePerNight
        if (selectedSort === 'Price: High to Low') return b.pricePerNight - a.pricePerNight
        if (selectedSort === 'Highest Rated') return b.hotel.rating - a.hotel.rating
        return 0 // Newest First (default order)
      })
  }, [searchQuery, selectedCity, selectedTypes, selectedPriceRanges, selectedSort])

  const handleRoomClick = (id) => {
    navigate(`/rooms/${id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Responsive Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left Column: Room Inventory List */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Header Text & Search Input */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-900">
                    Hotel Rooms & Luxury Suites
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Showing <span className="font-bold text-orange-600">{filteredRooms.length}</span> of {roomsDummyData.length} available properties
                    {selectedCity && ` in ${selectedCity}`}
                  </p>
                </div>

                {/* Clear Filter Button if active */}
                {(selectedTypes.length > 0 || selectedPriceRanges.length > 0 || searchQuery || selectedCity) && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 cursor-pointer transition-colors self-start sm:self-auto"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>

              {/* Real-time Dynamic Search Bar */}
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by hotel title, city, or address keyword..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Room List Cards */}
            {filteredRooms.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-playfair mb-2">No Matching Suites Found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  We could not find any hotel rooms matching your active filters. Try broadening your criteria or reset filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-semibold text-xs shadow-md hover:bg-orange-700 transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="group bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => handleRoomClick(room.id)}
                      className="relative md:w-64 lg:w-72 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
                    >
                      <img
                        src={room.images[0]}
                        alt={room.hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {room.roomType}
                      </span>
                    </div>

                    {/* Room Details Column */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* City Tag */}
                        <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                          {room.hotel.city}
                        </span>

                        {/* Hotel Name */}
                        <h3
                          onClick={() => handleRoomClick(room.id)}
                          className="text-xl font-bold text-gray-900 font-playfair mt-0.5 group-hover:text-orange-600 transition-colors cursor-pointer"
                        >
                          {room.hotel.name}
                        </h3>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2 mt-2">
                          <StarRating rating={room.hotel.rating} size={14} />
                          <span className="text-xs text-gray-500">
                            • {room.hotel.reviewsCount} reviews
                          </span>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                          <MapPin size={14} className="text-orange-500 shrink-0" />
                          <span className="truncate">{room.hotel.address}</span>
                        </div>

                        {/* Amenities Chips */}
                        <div className="flex flex-wrap gap-2 mt-3.5">
                          {room.amenities.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-100"
                            >
                              <span className="text-orange-500">{getAmenityIcon(item)}</span>
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and Book Action Row */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900 font-outfit">
                            ${room.pricePerNight}
                          </span>
                          <span className="text-xs text-gray-500"> / night</span>
                        </div>

                        <button
                          onClick={() => handleRoomClick(room.id)}
                          className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
                        >
                          View Details & Reserve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Filter Control Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-bold font-playfair text-lg">
                <SlidersHorizontal size={18} className="text-orange-600" />
                <span>Filters & Options</span>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setOpenFilters(!openFilters)}
                className="lg:hidden text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full"
              >
                {openFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              {/* Desktop Clear */}
              <button
                onClick={handleClearFilters}
                className="hidden lg:inline-flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600 font-semibold cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Clear</span>
              </button>
            </div>

            {/* Filter Items Body (Collapsible on Mobile, always open on Desktop) */}
            <div className={`${openFilters ? 'block' : 'hidden'} lg:block pt-5 space-y-6`}>
              {/* Filter 1: Popular Room Types */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Room Types
                </h4>
                <div className="space-y-2">
                  {roomTypes.map((type) => {
                    const isChecked = selectedTypes.includes(type)
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none hover:text-orange-600 transition-colors"
                      >
                        <div
                          onClick={() => handleTypeToggle(type)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-gray-300 bg-white hover:border-orange-400'
                          }`}
                        >
                          {isChecked && <Check size={12} />}
                        </div>
                        <span>{type}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Filter 2: Price Range */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Price Per Night ($)
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => {
                    const isChecked = selectedPriceRanges.includes(range)
                    return (
                      <label
                        key={range}
                        className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none hover:text-orange-600 transition-colors"
                      >
                        <div
                          onClick={() => handlePriceRangeToggle(range)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-gray-300 bg-white hover:border-orange-400'
                          }`}
                        >
                          {isChecked && <Check size={12} />}
                        </div>
                        <span>${range}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Filter 3: Sort Options (Radio Buttons) */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Sort Results By
                </h4>
                <div className="space-y-2">
                  {sortOptions.map((opt) => {
                    const isSelected = selectedSort === opt
                    return (
                      <label
                        key={opt}
                        onClick={() => setSelectedSort(opt)}
                        className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none hover:text-orange-600 transition-colors"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-orange-600 bg-white'
                              : 'border-gray-300 bg-white hover:border-orange-400'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-orange-600" />}
                        </div>
                        <span className={isSelected ? 'font-semibold text-orange-600' : ''}>
                          {opt}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
