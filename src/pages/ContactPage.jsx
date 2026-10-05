import React, { useState } from 'react'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Reservation Inquiry',
    message: ''
  })

  const [activeFaq, setActiveFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Full name validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      toast.error('Please provide your full legal name (minimum 2 characters)')
      return
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address')
      return
    }

    // 3. Phone validation
    const cleanedPhone = formData.phone.replace(/\D/g, '')
    if (cleanedPhone.length < 8) {
      toast.error('Please enter a valid phone number (minimum 8 digits)')
      return
    }

    // 4. Message validation
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      toast.error('Please describe your inquiry with at least 10 characters')
      return
    }

    toast.success('Your message has been received by our 24/7 Concierge Desk!')
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Reservation Inquiry',
      message: ''
    })
  }

  const faqs = [
    {
      q: 'What is QuickStay cancellation and refund policy?',
      a: 'Most suites feature free cancellation up to 24 hours prior to standard check-in time (3:00 PM local time). Full refunds are processed directly back to your original payment method via Stripe within 2–5 business days.'
    },
    {
      q: 'How do I check in upon arrival at the property?',
      a: 'Upon booking confirmation, your verified host coordinates directly through the phone or email provided. Keyless smart access codes or front desk VIP concierge greetings are arranged for your arrival.'
    },
    {
      q: 'How does payment processing work on QuickStay?',
      a: 'We partner with Stripe to ensure all transactions meet PCI-DSS Level 1 compliance. We support major credit cards, debit cards, and corporate travel accounts with zero hidden service charges.'
    },
    {
      q: 'Can I request early check-in or late check-out?',
      a: 'Yes, early check-in and late check-out can be requested through the concierge desk or directly with the verified host, subject to availability.'
    }
  ]

  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          badge="VIP Concierge Support"
          title="Contact Our Hospitality Desk"
          subtitle="Whether planning a bespoke celebration or requiring stay assistance, our dedicated team is at your service 24 hours a day."
        />

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-start">
          {/* Left Column: Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold font-playfair text-gray-900">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Telephone Concierge</h4>
                    <p className="text-gray-500 mt-0.5">+1 (800) 555-STAY (Toll-Free)</p>
                    <p className="text-gray-500">+1 (212) 555-0199 (Direct International)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Inquiries</h4>
                    <p className="text-gray-500 mt-0.5">concierge@quickstay-luxury.com</p>
                    <p className="text-gray-500">reservations@quickstay-luxury.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Headquarters</h4>
                    <p className="text-gray-500 mt-0.5">QuickStay Tower, 745 Fifth Avenue</p>
                    <p className="text-gray-500">New York, NY 10151, United States</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Operating Hours</h4>
                    <p className="text-gray-500 mt-0.5">Global Guest Desk: 24/7 / 365 Days</p>
                    <p className="text-gray-500">Owner Partnership Support: 8 AM – 8 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controlled Form with Client-side Validation (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold font-playfair text-gray-900 mb-2">
              Send An Official Dispatch
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              All inquiries receive priority handling from our dedicated duty manager.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lady Genevieve Vance"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. genevieve@vance.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 555 987 6543"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Inquiry Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Reservation Inquiry">Reservation Inquiry</option>
                    <option value="VIP Event & Private Villa">VIP Event & Private Villa</option>
                    <option value="Hotelier Property Listing">Hotelier Property Listing</option>
                    <option value="Billing & Stripe Transaction">Billing & Stripe Transaction</option>
                    <option value="Bespoke Concierge Request">Bespoke Concierge Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Message Details *</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your request, destination of interest, and stay dates..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={15} />
                <span>Submit Concierge Dispatch</span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 my-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={22} className="text-orange-600" />
            <h3 className="text-xl font-bold font-playfair text-gray-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-orange-600' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
