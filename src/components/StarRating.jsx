import React from 'react'
import { Star } from 'lucide-react'

const StarRating = ({ rating = 4.5, size = 16, showCount = false, reviewsCount = 200 }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => {
          const filled = index + 1 <= Math.floor(rating)
          const half = !filled && index < rating
          return (
            <Star
              key={index}
              size={size}
              className={`${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-200 text-amber-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          )
        })}
      </div>
      <span className="text-xs font-semibold text-gray-700 ml-0.5">{rating}</span>
      {showCount && (
        <span className="text-xs text-gray-400">({reviewsCount}+ reviews)</span>
      )}
    </div>
  )
}

export default StarRating
