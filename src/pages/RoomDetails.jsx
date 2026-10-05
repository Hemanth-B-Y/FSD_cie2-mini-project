import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { roomsDummyData, roomCommonData, facilityIcons } from '../assets/assets'
import StarRating from '../components/StarRating'
import toast from 'react-hot-toast'
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  LogOut,
  ShieldCheck,
  Car,
  Wifi,
  Waves,
  Coffee,
  Wind,
  Sparkles,
  Dumbbell,
  BellRing,
  Sun,
  Tv,
  Phone,
  Mail,
  ArrowRight,
  CreditCard
} from 'lucide-react'

const getAmenityIcon = (name) => {
  switch (facilityIcons[name]) {
    case 'wifi': return <Wifi size={16} />
    case 'waves': return <Waves size={16} />
    case 'coffee': return <Coffee size={16} />
    case 'wind': return <Wind size={16} />
    case 'sparkles': return <Sparkles size={16} />
    case 'dumbbell': return <Dumbbell size={16} />
    case 'car': return <Car size={16} />
    case 'bell-ring': return <BellRing size={16} />
    case 'sun': return <Sun size={16} />
    case 'tv': return <Tv size={16} />
    default: return <Sparkles size={16} />
  }
}

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [checkIn, setCheckIn] = useState('2026-10-15')
  const [checkOut, setCheckOut] = useState('2026-10-18')
  const [guests, setGuests] = useState(2)
  const [bookingConfirmedModal, setBookingConfirmedModal] = useState(false)
  const [calculatedCost, setCalculatedCost] = useState(0)
  const [nightsCount, setNightsCount] = useState(3)

  // Find room based on id param
  useEffect(() => {
    const found = roomsDummyData.find((r) => r.id === id)
    if (found) {
      setRoom(found)
      setMainImage(found.images[0])
    } else {
      // Fallback to first room if invalid ID
      setRoom(roomsDummyData[0])
      setMainImage(roomsDummyData[0].images[0])
    }
  }, [id])

  // Calculate nights and cost
  useEffect(() => {
    if (checkIn && checkOut && room) {
      const start = new Date(checkIn)
      const end = new Date(checkOut)
      const diffTime = end - start
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 0) {
        setNightsCount(diffDays)
        setCalculatedCost(diffDays * room.pricePerNight)
      } else {
        setNightsCount(1)
        setCalculatedCost(room.pricePerNight)
      }
    }
  }, [checkIn, checkOut, room])

  if (!room) return null

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date')
      return
    }

    setBookingConfirmedModal(true)
  }

  const handleCompleteReservation = () => {
    setBookingConfirmedModal(false)
    toast.success(`Suite successfully reserved at ${room.hotel.name}!`)
    navigate('/my-bookings')
    window.scrollTo(0, 0)
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header: Hotel Title, Room Type, Rating & Address */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs uppercase font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  {room.hotel.city}
                </span>
                <span className="text-xs uppercase font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                  {room.roomType}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  20% OFF Summer Special
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-playfair text-gray-900 tracking-tight">
                {room.hotel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-gray-600">
                <StarRating rating={room.hotel.rating} size={15} showCount reviewsCount={room.hotel.reviewsCount} />
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={15} className="text-orange-500" />
                  <span>{room.hotel.address}</span>
                </div>
              </div>
            </div>

            {/* Price Pill on Top */}
            <div className="text-left md:text-right shrink-0">
              <span className="text-3xl font-extrabold text-gray-900 font-outfit">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-gray-500 block">per night • taxes included</span>
            </div>
          </div>
        </div>

        {/* Multi-Image Interactive Gallery (GreatStack Specification) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
          {/* Main Large Image */}
          <div className="lg:col-span-3 aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 shadow-md">
            <img
              src={mainImage}
              alt="Main Suite"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Secondary Thumbnails */}
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
            {room.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                  mainImage === img
                    ? 'ring-4 ring-orange-500 shadow-md scale-95'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Main Section: Highlights/Specs (Left) + Booking Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          {/* Left Details Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Highlights & Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900 mb-2">
                Experience Luxury Like Never Before
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {room.description}
              </p>

              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-800 mb-4">
                Exclusive Amenities & Facilities Included
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/50 border border-orange-100 text-xs font-medium text-gray-800"
                  >
                    <span className="text-orange-600">{getAmenityIcon(item)}</span>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold font-playfair text-gray-900 mb-4">
                Essential Stay Policies & Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomCommonData.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{spec.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hosted By Property Owner Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={room.hotel.owner.image}
                  alt={room.hotel.owner.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 shadow-md"
                />
                <div>
                  <span className="text-[11px] uppercase font-bold text-orange-600 tracking-wider">
                    Verified Host & Hotelier
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 font-playfair">{room.hotel.owner.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Phone size={12} /> {room.hotel.owner.phone}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Mail size={12} /> {room.hotel.owner.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.success(`Connected to Concierge desk for ${room.hotel.owner.name}`)}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
              >
                Contact Host Concierge
              </button>
            </div>
          </div>

          {/* Right Floating Booking Form (1 Col) */}
          <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-gray-100">
            <div className="flex items-baseline justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <span className="text-3xl font-extrabold text-gray-900 font-outfit">
                  ${room.pricePerNight}
                </span>
                <span className="text-xs text-gray-500"> / night</span>
              </div>
              <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Available Now
              </div>
            </div>

            {/* Checkin / Checkout Availability Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <label htmlFor="details-checkin" className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Check-in Date
                  </label>
                  <input
                    id="details-checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <label htmlFor="details-checkout" className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Check-out Date
                  </label>
                  <input
                    id="details-checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <label htmlFor="details-guests" className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between">
                  <input
                    id="details-guests"
                    type="number"
                    min="1"
                    max="6"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none"
                  />
                  <Users size={16} className="text-gray-400" />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="py-3 px-4 bg-orange-50/60 rounded-2xl border border-orange-100 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>${room.pricePerNight} × {nightsCount} nights</span>
                  <span className="font-semibold text-gray-900">${calculatedCost}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service & Luxury Cleaning Fee</span>
                  <span className="font-semibold text-emerald-600">FREE ($0)</span>
                </div>
                <div className="pt-2 border-t border-orange-200 flex justify-between font-bold text-sm text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-orange-600 font-outfit text-base">${calculatedCost}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Suite Now</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Instant reservation • No booking fee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {bookingConfirmedModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={30} />
            </div>

            <h3 className="text-2xl font-bold font-playfair text-gray-900 text-center mb-1">
              Confirm Your Stay
            </h3>
            <p className="text-xs text-gray-500 text-center mb-5">
              Review your stay itinerary before adding to My Bookings.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 text-xs text-gray-700 mb-6 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Property:</span>
                <span className="font-semibold text-gray-900 text-right">{room.hotel.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Room Category:</span>
                <span className="font-semibold text-gray-900">{room.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dates:</span>
                <span className="font-semibold text-gray-900">{checkIn} to {checkOut} ({nightsCount} nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guests:</span>
                <span className="font-semibold text-gray-900">{guests} Guests</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
                <span>Grand Total:</span>
                <span className="text-orange-600 font-outfit text-base">${calculatedCost}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setBookingConfirmedModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
              >
                Modify Dates
              </button>
              <button
                type="button"
                onClick={handleCompleteReservation}
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CreditCard size={15} />
                <span>Confirm & Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomDetails
