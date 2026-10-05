import React, { useState } from 'react'
import Title from './Title'
import toast from 'react-hot-toast'
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    toast.success('Thank you for subscribing to QuickStay Luxury Gazette!')
    setEmail('')
  }

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/10 text-orange-400 mb-4 border border-white/10">
              VIP Travel Gazette
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair mb-4">
              Stay Inspired With Luxury Escapes
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
              Subscribe to receive private invitations, bespoke curated itineraries, and unpublished boutique hotel rates directly to your inbox.
            </p>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/20 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-lg hover:shadow-orange-600/30 transition-all cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Zero spam policy. Unsubscribe anytime with a single click.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
