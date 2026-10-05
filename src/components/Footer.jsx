import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Hotel,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Shield,
  Heart
} from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleMiniSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast.success('Thank you for subscribing to QuickStay updates!')
    setEmail('')
  }

  return (
    <footer className="bg-slate-950 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2.5 text-white mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md group-hover:bg-orange-500 transition-colors">
                <Hotel size={22} />
              </div>
              <span className="text-2xl font-bold font-playfair tracking-tight text-white">
                Quick<span className="text-orange-500">Stay</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              QuickStay is an elite hospitality platform connecting world travelers with curated luxury resorts, boutique villas, and penthouse suites globally.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-orange-600 hover:text-white text-gray-400 flex items-center justify-center transition-colors border border-gray-800"
                  aria-label="Social Link"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-semibold font-playfair mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  Browse Hotels & Suites
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  My Reservations
                </Link>
              </li>
              <li>
                <Link to="/owner" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  Property Owner Portal
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  About Our Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white text-base font-semibold font-playfair mb-4">Support & Trust</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-400 transition-colors">
                  Help & Contact Desk
                </Link>
              </li>
              <li>
                <a href="#safety" className="hover:text-orange-400 transition-colors">
                  Safety Protocols
                </a>
              </li>
              <li>
                <a href="#cancellation" className="hover:text-orange-400 transition-colors">
                  Cancellation Policies
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Updates */}
          <div>
            <h4 className="text-white text-base font-semibold font-playfair mb-4">Stay Connected</h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Sign up for secret season deals and special VIP promotions.
            </p>
            <form onSubmit={handleMiniSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Join VIP Club</span>
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 QuickStay Inc. All Rights Reserved. • CS3301 Full Stack Development CIE-2 Project</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-gray-400">
              <Shield size={14} className="text-orange-500" />
              PCI-DSS Certified Stripe Payments
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
