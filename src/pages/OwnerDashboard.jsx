import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { roomsDummyData, roomTypes, facilityIcons } from '../assets/assets'
import toast from 'react-hot-toast'
import {
  Hotel,
  PlusCircle,
  ListFilter,
  DollarSign,
  TrendingUp,
  BedDouble,
  Users,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Upload,
  CalendarCheck,
  Building,
  Eye,
  Sliders
} from 'lucide-react'

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'add-room' | 'list-rooms'
  const [inventory, setInventory] = useState(roomsDummyData)

  // Add Room Form State
  const [newRoom, setNewRoom] = useState({
    hotelName: 'The Grand Imperial Suites',
    city: 'New York',
    address: '100 Fifth Avenue, Manhattan',
    roomType: 'Luxury Suite',
    pricePerNight: 350,
    description: 'Bespoke skyline residence with high ceiling windows, Italian furnishings, and private butler service.',
    amenities: ['Free Wi-Fi', 'Free Breakfast', 'Air Conditioning', 'Swimming Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000'
  })

  // Toggle availability of room
  const handleToggleAvailability = (roomId) => {
    setInventory((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const nextState = !r.isAvailable
          toast.success(`${r.hotel.name} availability set to ${nextState ? 'Available' : 'Booked'}`)
          return { ...r, isAvailable: nextState }
        }
        return r
      })
    )
  }

  // Handle Add Room Submission
  const handleAddRoom = (e) => {
    e.preventDefault()

    const created = {
      id: `room-${Date.now()}`,
      hotel: {
        name: newRoom.hotelName,
        address: newRoom.address,
        city: newRoom.city,
        rating: 5.0,
        reviewsCount: 1,
        owner: {
          name: 'Alexander Wright',
          phone: '+1 (555) 019-2834',
          email: 'alex.wright@executive.com',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300'
        }
      },
      roomType: newRoom.roomType,
      pricePerNight: Number(newRoom.pricePerNight),
      amenities: newRoom.amenities,
      images: [
        newRoom.imageUrl,
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000'
      ],
      description: newRoom.description,
      isAvailable: true
    }

    setInventory([created, ...inventory])
    toast.success(`New suite '${newRoom.roomType}' listed successfully in ${newRoom.city}!`)
    setActiveTab('list-rooms')
  }

  // Toggle amenity checkbox in Add Room form
  const handleAmenityCheck = (amenity) => {
    setNewRoom((prev) => {
      const exists = prev.amenities.includes(amenity)
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      }
    })
  }

  // KPI Calculations
  const totalRooms = inventory.length
  const availableRoomsCount = inventory.filter((r) => r.isAvailable).length
  const totalRevenue = inventory.reduce((acc, r) => acc + r.pricePerNight * 4, 18540)
  const occupancyRate = Math.round(((totalRooms - availableRoomsCount) / (totalRooms || 1)) * 100)

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      {/* Specialized Property Owner Header */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
              <Hotel size={20} />
            </div>
            <div>
              <span className="font-playfair text-xl font-bold text-white tracking-tight">
                Quick<span className="text-orange-500">Stay</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-950/80 border border-orange-800/60 px-2 py-0.5 rounded-full ml-2">
                Property Owner Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Guest Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Owner Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pb-6 border-b border-slate-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <TrendingUp size={15} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('add-room')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'add-room'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <PlusCircle size={15} />
            <span>Add New Room</span>
          </button>

          <button
            onClick={() => setActiveTab('list-rooms')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'list-rooms'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ListFilter size={15} />
            <span>Manage Inventory ({inventory.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-semibold uppercase">Total Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <DollarSign size={17} />
                  </div>
                </div>
                <span className="text-3xl font-bold font-outfit text-white">
                  ${totalRevenue.toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-400 block mt-1">+14.2% from last month</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-semibold uppercase">Total Suites</span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                    <Building size={17} />
                  </div>
                </div>
                <span className="text-3xl font-bold font-outfit text-white">{totalRooms}</span>
                <span className="text-[11px] text-gray-400 block mt-1">Listed across 6 cities</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-semibold uppercase">Active Available</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <BedDouble size={17} />
                  </div>
                </div>
                <span className="text-3xl font-bold font-outfit text-white">
                  {availableRoomsCount}
                </span>
                <span className="text-[11px] text-gray-400 block mt-1">Ready for instant guest check-in</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-gray-400 mb-3">
                  <span className="text-xs font-semibold uppercase">Occupancy Rate</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Users size={17} />
                  </div>
                </div>
                <span className="text-3xl font-bold font-outfit text-white">{occupancyRate}%</span>
                <span className="text-[11px] text-amber-400 block mt-1">Optimal guest reservation ratio</span>
              </div>
            </div>

            {/* Recent Bookings Feed */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold font-playfair text-white mb-4">
                Recent Guest Reservations
              </h3>
              <div className="divide-y divide-slate-700/60">
                {[
                  {
                    id: 'QS-9810',
                    guest: 'Dr. Jonathan Mitchell',
                    room: 'The Ritz Palm Grand Palace • Luxury Suite',
                    dates: 'Oct 14 - Oct 18, 2026',
                    amount: '$1,680',
                    status: 'Paid'
                  },
                  {
                    id: 'QS-9811',
                    guest: 'Elena Rostova',
                    room: "Hôtel De L'Étoile Champs • Double Bed",
                    dates: 'Nov 05 - Nov 08, 2026',
                    amount: '$840',
                    status: 'Pending'
                  },
                  {
                    id: 'QS-9812',
                    guest: 'Marcus Aurelius Vance',
                    room: 'Burj Mirage Luxury Marina • Penthouse Villa',
                    dates: 'Dec 01 - Dec 06, 2026',
                    amount: '$4,450',
                    status: 'Paid'
                  }
                ].map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono text-orange-400 font-semibold">{item.id}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{item.guest}</h4>
                      <p className="text-gray-400">{item.room}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-gray-400 block">{item.dates}</span>
                      <span className="text-base font-bold text-white font-outfit">{item.amount}</span>
                      <span
                        className={`inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'Paid'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADD NEW ROOM FORM */}
        {activeTab === 'add-room' && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto animate-in fade-in duration-200">
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white mb-2">
              List A New Hotel Suite
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-8">
              Provide room photography, category, pricing, and available guest amenities to list immediately.
            </p>

            <form onSubmit={handleAddRoom} className="space-y-6 text-xs">
              {/* Hotel Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">Hotel Property Name</label>
                  <input
                    type="text"
                    value={newRoom.hotelName}
                    onChange={(e) => setNewRoom({ ...newRoom, hotelName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">City Destination</label>
                  <input
                    type="text"
                    value={newRoom.city}
                    onChange={(e) => setNewRoom({ ...newRoom, city: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1.5">Street Address</label>
                <input
                  type="text"
                  value={newRoom.address}
                  onChange={(e) => setNewRoom({ ...newRoom, address: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Room Type & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">Room Category</label>
                  <select
                    value={newRoom.roomType}
                    onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  >
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">Price Per Night (USD)</label>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    value={newRoom.pricePerNight}
                    onChange={(e) => setNewRoom({ ...newRoom, pricePerNight: Number(e.target.value) })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Image URL with live preview */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1.5">Suite Image URL</label>
                <input
                  type="url"
                  value={newRoom.imageUrl}
                  onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                />
                {newRoom.imageUrl && (
                  <div className="mt-3 aspect-[16/9] w-full max-w-sm rounded-xl overflow-hidden border border-slate-700">
                    <img src={newRoom.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1.5">Room Description</label>
                <textarea
                  rows="3"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Amenities Checklist */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Available Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.keys(facilityIcons).map((amenity) => {
                    const isChecked = newRoom.amenities.includes(amenity)
                    return (
                      <div
                        key={amenity}
                        onClick={() => handleAmenityCheck(amenity)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-semibold'
                            : 'bg-slate-900 border-slate-700 text-gray-400 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-600'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="truncate">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                <span>Publish Suite to Live Catalogue</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE ROOMS WITH TOGGLE AVAILABILITY */}
        {activeTab === 'list-rooms' && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold font-playfair text-white">Current Room Inventory</h3>
                <p className="text-xs text-gray-400">
                  Toggle instant availability to pause or reopen bookings for any suite.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('add-room')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold cursor-pointer"
              >
                <PlusCircle size={14} />
                <span>Add Room</span>
              </button>
            </div>

            {/* Table of Rooms */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-slate-900/60 uppercase font-semibold text-gray-400 border-b border-slate-700 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Room & Property</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price / Night</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Instant Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {inventory.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img
                          src={r.images[0]}
                          alt={r.hotel.name}
                          className="w-14 h-11 rounded-lg object-cover shadow-sm shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-white text-sm leading-snug">{r.hotel.name}</h4>
                          <span className="text-[11px] text-gray-400">{r.hotel.address}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-orange-400">{r.roomType}</td>
                      <td className="py-4 px-4 font-bold text-white font-outfit text-sm">
                        ${r.pricePerNight}
                      </td>
                      <td className="py-4 px-4">{r.hotel.city}</td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            r.isAvailable
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {r.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleToggleAvailability(r.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            r.isAvailable
                              ? 'bg-slate-700 hover:bg-rose-600/40 text-gray-200'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {r.isAvailable ? 'Set Unavailable' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerDashboard
