import React, { useState } from 'react'
import Title from '../components/Title'
import { userBookingsDummyData } from '../assets/assets'
import toast from 'react-hot-toast'
import {
  Calendar,
  CreditCard,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Lock,
  X,
  Receipt,
  Download,
  Trash2
} from 'lucide-react'

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData)
  const [activePaymentBooking, setActivePaymentBooking] = useState(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    cardholder: 'Alexander Wright'
  })

  // Open Stripe Checkout simulation modal
  const handleOpenStripeModal = (booking) => {
    setActivePaymentBooking(booking)
  }

  // Simulate Stripe payment processing
  const handleProcessPayment = (e) => {
    e.preventDefault()
    setIsProcessingPayment(true)

    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === activePaymentBooking.id
            ? {
                ...b,
                isPaid: true,
                paymentMethod: 'Stripe (Card ending in 4242)'
              }
            : b
        )
      )
      setIsProcessingPayment(false)
      setActivePaymentBooking(null)
      toast.success(
        `Payment of $${activePaymentBooking.totalPrice} processed successfully via Stripe!`
      )
    }, 1500)
  }

  // Cancel reservation
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? Full refund will be initiated.')) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId))
      toast.success('Reservation cancelled and 100% refund initiated.')
    }
  }

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          align="left"
          badge="Guest Portal"
          title="My Bookings & Reservations"
          subtitle="Track your upcoming stays, manage check-in itineraries, and settle pending payments securely via Stripe."
        />

        {/* Bookings Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          {/* Table Header (Visible on md and above) */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="col-span-6">Hotel & Suite Details</div>
            <div className="col-span-3 text-center">Dates & Timings</div>
            <div className="col-span-3 text-right">Payment & Status</div>
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="py-16 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-playfair text-gray-800">No Reservations Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-5">
                You do not have any active reservations. Browse our premier destinations and reserve your dream stay.
              </p>
              <a
                href="/rooms"
                className="px-6 py-2.5 rounded-full bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
              >
                Browse Hotels
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="py-6 flex flex-col md:grid md:grid-cols-12 gap-6 items-start md:items-center"
                >
                  {/* Column 1: Hotel & Room Info (col-span-6) */}
                  <div className="w-full md:col-span-6 flex items-start gap-4">
                    <img
                      src={booking.room.images[0]}
                      alt={booking.hotel.name}
                      className="w-24 sm:w-28 h-20 sm:h-24 rounded-2xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-orange-600 font-mono">
                        {booking.bookingId}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 font-playfair truncate">
                        {booking.hotel.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">{booking.room.roomType}</p>

                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 truncate">
                        <MapPin size={12} className="text-orange-500 shrink-0" />
                        <span className="truncate">{booking.hotel.address}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 font-medium">
                        <span className="flex items-center gap-1">
                          <Users size={13} className="text-gray-400" />
                          {booking.guests} Guests
                        </span>
                        <span className="text-gray-900 font-bold font-outfit text-sm">
                          ${booking.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Date & Timings (col-span-3) */}
                  <div className="w-full md:col-span-3 flex md:flex-col justify-between md:items-center gap-2 text-xs py-2 px-3 md:p-0 bg-gray-50 md:bg-transparent rounded-xl">
                    <div className="text-left md:text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Check-in</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(booking.checkInDate).toDateString()}
                      </span>
                    </div>
                    <div className="text-right md:text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Check-out</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(booking.checkOutDate).toDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Payment Status & Action (col-span-3) */}
                  <div className="w-full md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                    {/* Status Indicator Dot */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          booking.isPaid ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                        }`}
                      />
                      <span
                        className={`text-xs font-bold ${
                          booking.isPaid ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {booking.isPaid ? 'Paid & Confirmed' : 'Payment Required'}
                      </span>
                    </div>

                    {/* Actions: Pay Now / Details */}
                    <div className="flex items-center gap-2">
                      {!booking.isPaid ? (
                        <button
                          onClick={() => handleOpenStripeModal(booking)}
                          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <CreditCard size={14} />
                          <span>Pay Now</span>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            toast.success(`Booking receipt downloaded for ${booking.bookingId}`)
                          }
                          className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Receipt size={13} />
                          <span>Receipt</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        title="Cancel reservation"
                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stripe Payment Modal Simulation (Feature Beyond Tutorial) */}
      {activePaymentBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">Stripe Test Checkout</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Test Mode • No real charge</span>
                </div>
              </div>

              <button
                onClick={() => setActivePaymentBooking(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Price Preview */}
            <div className="my-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-700 font-semibold block">Total Amount Due</span>
                <span className="text-[11px] text-gray-500">{activePaymentBooking.hotel.name}</span>
              </div>
              <span className="text-2xl font-bold font-outfit text-indigo-900">
                ${activePaymentBooking.totalPrice}
              </span>
            </div>

            {/* Test Card Form */}
            <form onSubmit={handleProcessPayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentForm.cardholder}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardholder: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Card Number (Stripe Test)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Lock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Expires (MM/YY)</label>
                  <input
                    type="text"
                    value={paymentForm.expiry}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    value={paymentForm.cvc}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span>Authorizing With Stripe...</span>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Pay ${activePaymentBooking.totalPrice} USD</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center pt-1">
                Encrypted with 256-bit SSL. This transaction is safely simulated in test mode.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings
