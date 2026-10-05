import React from 'react'
import { Sun, Moon } from 'lucide-react'

const ThemeToggleBtn = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle visual theme"
      className="p-2 rounded-full border border-gray-200 hover:border-orange-500 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-orange-600 transition-all shadow-sm cursor-pointer"
      title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
    >
      {isDark ? <Sun size={17} className="text-amber-500" /> : <Moon size={17} />}
    </button>
  )
}

export default ThemeToggleBtn
