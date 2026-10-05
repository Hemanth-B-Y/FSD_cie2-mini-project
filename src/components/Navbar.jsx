import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Hotel,
  Menu,
  X,
  Search,
  CalendarCheck,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import ThemeToggleBtn from './ThemeToggleBtn'
import toast from 'react-hot-toast'

const Navbar = ({ isDark, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Authenticated user state
  const [manageAccountOpen, setManageAccountOpen] = useState(false)

  // Current mock user details
  const [currentUser, setCurrentUser] = useState({
    name: 'Alexander Wright',
    email: 'alex.wright@executive.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    role: 'VIP Traveler'
  })

  const navigate = useNavigate()
  const location = useLocation()
  const isOwnerPath = location.pathname.includes('owner')

  // Scroll effect matching tutorial
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') {
        setIsScrolled(true)
        return
      }
      setIsScrolled(window.scrollY > 40)
    }

    if (location.pathname !== '/') {
      setIsScrolled(true)
    } else {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Hide default navbar on owner dashboard path as instructed in tutorial
  if (isOwnerPath) return null

  const isHome = location.pathname === '/'
  const navBg = isHome
    ? isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 text-gray-800'
      : 'bg-transparent text-white'
    : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 text-gray-800'

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Hotels', path: '/rooms' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ]

  const handleSignOut = () => {
    setIsLoggedIn(false)
    setUserDropdownOpen(false)
    toast.success('Signed out successfully')
  }

  const handleSignIn = () => {
    setIsLoggedIn(true)
    toast.success('Welcome back, Alexander!')
  }

  const handleAccountUpdate = (e) => {
    e.preventDefault()
    toast.success('Account profile updated successfully!')
    setManageAccountOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg} py-3.5`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Hotel size={22} />
              </div>
              <span
                className={`text-2xl font-bold font-playfair tracking-tight ${
                  !isScrolled && isHome ? 'text-white' : 'text-gray-900'
                }`}
              >
                Quick<span className="text-orange-500">Stay</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-orange-500 relative py-1 ${
                      isActive
                        ? 'text-orange-500 font-semibold'
                        : !isScrolled && isHome
                        ? 'text-white/90'
                        : 'text-gray-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Action Icons & Controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Shortcut */}
              <button
                onClick={() => {
                  navigate('/rooms')
                  window.scrollTo(0, 0)
                }}
                title="Search destination"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  !isScrolled && isHome
                    ? 'text-white hover:bg-white/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-orange-600'
                }`}
              >
                <Search size={18} />
              </button>

              {/* Property Owner Dashboard Quick Link */}
              <Link
                to="/owner"
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  !isScrolled && isHome
                    ? 'border-white/40 text-white hover:bg-white/10'
                    : 'border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100'
                }`}
              >
                Owner Portal
              </Link>

              {/* Theme Toggle */}
              <ThemeToggleBtn isDark={isDark} onToggle={onToggleTheme} />

              {/* User Authentication / Clerk Simulation */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-2 rounded-full border border-gray-200/80 bg-white shadow-sm hover:border-orange-500 transition-all cursor-pointer text-gray-800"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold pr-1 max-w-[100px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className="text-gray-400 mr-1" />
                  </button>

                  {/* Dropdown Menu (Matches Clerk UserButton spec) */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                          {currentUser.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/my-bookings"
                          onClick={() => {
                            setUserDropdownOpen(false)
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <CalendarCheck size={16} className="text-orange-500" />
                          <span>My Bookings</span>
                        </Link>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false)
                            setManageAccountOpen(true)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-left cursor-pointer"
                        >
                          <User size={16} className="text-orange-500" />
                          <span>Manage Account</span>
                        </button>

                        <Link
                          to="/owner"
                          onClick={() => {
                            setUserDropdownOpen(false)
                            window.scrollTo(0, 0)
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-orange-500" />
                          <span>Hotel Owner Dashboard</span>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-all shadow-md shadow-orange-600/20 cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggleBtn isDark={isDark} onToggle={onToggleTheme} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation Drawer"
                className={`p-2 rounded-lg cursor-pointer ${
                  !isScrolled && isHome ? 'text-white' : 'text-gray-900'
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-white text-gray-900 border-b border-gray-200 px-4 pt-4 pb-6 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/my-bookings"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              My Bookings
            </Link>

            <Link
              to="/owner"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-orange-600 bg-orange-50 font-semibold"
            >
              Owner Dashboard
            </Link>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              {isLoggedIn ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="text-xs font-semibold text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleSignIn()
                    setIsMenuOpen(false)
                  }}
                  className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-semibold text-xs text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Manage Account Modal (Clerk Emulation) */}
      {manageAccountOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-bold font-playfair text-lg">
                <ShieldCheck className="text-orange-600" size={20} />
                <span>Account Management</span>
              </div>
              <button
                onClick={() => setManageAccountOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAccountUpdate} className="mt-5 space-y-4 text-sm">
              <div className="text-center pb-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-orange-500 shadow-md mb-2"
                />
                <span className="text-xs text-orange-600 font-medium cursor-pointer hover:underline">
                  Change Profile Photo
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setManageAccountOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
