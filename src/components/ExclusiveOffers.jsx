import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'
import { exclusiveOffers } from '../assets/assets'
import { ArrowRight, Sparkles, Clock } from 'lucide-react'

const ExclusiveOffers = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <Title
            align="left"
            badge="Limited Season Deals"
            title="Exclusive Offers & Escapes"
            subtitle="Take advantage of exclusive seasonal packages, early-bird rates, and complimentary VIP upgrades."
          />
          <Link
            to="/rooms"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors group mb-10 self-start md:self-auto"
          >
            <span>View All Offers</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {exclusiveOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[360px] flex flex-col justify-end p-6 border border-gray-100 text-white"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.1) 100%), url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Discount Tag */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles size={14} />
                <span>{offer.priceOff}% OFF</span>
              </div>

              {/* Offer Details */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold font-playfair mb-2 group-hover:text-orange-300 transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 mb-4 leading-relaxed">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300">
                    <Clock size={13} />
                    <span>Expires: {offer.expiryDate}</span>
                  </div>
                  <Link
                    to="/rooms"
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-white/20 hover:bg-white text-white hover:text-gray-900 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-200"
                  >
                    <span>Claim</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExclusiveOffers
