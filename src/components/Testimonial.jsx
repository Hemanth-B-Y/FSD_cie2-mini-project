import React from 'react'
import Title from './Title'
import StarRating from './StarRating'
import { testimonials } from '../assets/assets'
import { Quote } from 'lucide-react'

const Testimonial = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          badge="Guest Memoirs"
          title="What Our Guests Say"
          subtitle="Discover why discerning luxury travelers trust QuickStay for their memorable journeys and prestigious stays."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              <Quote className="text-orange-200 w-10 h-10 mb-4" />

              <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                "{item.review}"
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/20"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.address}</p>
                </div>
                <div className="shrink-0">
                  <StarRating rating={item.rating} size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
