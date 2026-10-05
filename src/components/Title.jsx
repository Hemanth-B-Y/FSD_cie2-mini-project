import React from 'react'

const Title = ({
  title,
  subtitle,
  align = 'center',
  font = 'font-playfair',
  badge = ''
}) => {
  const isLeft = align === 'left'

  return (
    <div className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'} mb-10`}>
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700 mb-2">
          {badge}
        </span>
      )}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight ${font}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-3 h-1 w-16 bg-orange-500 rounded-full ${isLeft ? '' : 'mx-auto'}`} />
    </div>
  )
}

export default Title
