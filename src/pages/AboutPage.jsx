import React from 'react'
import Title from '../components/Title'
import { ShieldCheck, Award, HeartHandshake, Compass, Users, Sparkles } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          badge="Our Ethos & Heritage"
          title="Curating World-Class Hospitality"
          subtitle="QuickStay is established upon the timeless tradition of personalized concierge care, architectural grandeur, and memorable journeys."
        />

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center my-12 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div>
            <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">
              The QuickStay Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-900 mt-2 mb-4 leading-tight">
              Where Exceptional Luxury Meets Seamless Simplicity
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Founded in 2024, QuickStay has transformed how travelers discover and reserve elite residences, five-star hotel suites, and secluded seaside villas across major cosmopolitan and exotic destination hubs.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Every property on our platform is hand-inspected for cleanliness, acoustic tranquility, and premium bedding. Our direct owner relationships guarantee genuine best-rate guarantees and complimentary VIP welcome amenities.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-outfit">10+</span>
                <span className="text-xs text-gray-500 block mt-0.5">Global Cities</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-outfit">98.9%</span>
                <span className="text-xs text-gray-500 block mt-0.5">Satisfaction</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-outfit">24/7</span>
                <span className="text-xs text-gray-500 block mt-0.5">Live Concierge</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
              alt="Luxury Hotel Lobby"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: ShieldCheck,
              title: 'Verified Hosts & Suites',
              desc: 'Every listed property undergoes physical review and rigorous hospitality audits.'
            },
            {
              icon: Award,
              title: 'Best Rate Guarantee',
              desc: 'Transparent pricing with no unexpected hidden resort fees at checkout.'
            },
            {
              icon: HeartHandshake,
              title: 'Bespoke Concierge',
              desc: 'Dedicated travel designers ready to arrange yacht charters, private dinners, and drivers.'
            },
            {
              icon: Compass,
              title: 'Curated Itineraries',
              desc: 'Insider recommendations for local Michelin dining, secret beaches, and cultural tours.'
            }
          ].map((pillar, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <pillar.icon size={22} />
              </div>
              <h4 className="text-base font-bold text-gray-900 font-playfair mb-2">{pillar.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutPage
