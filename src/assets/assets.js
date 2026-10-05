// Centralized Mock Data & Assets for QuickStay Hotel Booking Application
// CS3301 Full Stack Development CIE-2 Assignment

export const cities = [
  "New York",
  "Paris",
  "London",
  "Dubai",
  "Tokyo",
  "Rome",
  "San Francisco",
  "Bali",
  "Santorini",
  "Singapore"
];

export const roomTypes = [
  "Single Bed",
  "Double Bed",
  "Luxury Suite",
  "Family Suite",
  "Penthouse Villa"
];

export const priceRanges = [
  "0 - 150",
  "150 - 300",
  "300 - 500",
  "500 - 1000",
  "1000+"
];

export const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Highest Rated",
  "Newest First"
];

export const facilityIcons = {
  "Free Wi-Fi": "wifi",
  "Swimming Pool": "waves",
  "Free Breakfast": "coffee",
  "Air Conditioning": "wind",
  "Spa & Wellness": "sparkles",
  "Fitness Center": "dumbbell",
  "Free Parking": "car",
  "Room Service": "bell-ring",
  "Ocean View": "sun",
  "Smart TV": "tv"
};

export const roomCommonData = [
  {
    title: "Check-in from 3:00 PM",
    description: "Early check-in available upon request and property availability.",
    icon: "clock"
  },
  {
    title: "Check-out until 11:00 AM",
    description: "Express check-out is supported via our automated concierge desk.",
    icon: "log-out"
  },
  {
    title: "Flexible Free Cancellation",
    description: "Cancel up to 24 hours prior to arrival for 100% full booking refund.",
    icon: "shield-check"
  },
  {
    title: "Complimentary Valet Parking",
    description: "Secure, covered 24/7 on-site parking with EV charging stations.",
    icon: "car"
  }
];

export const exclusiveOffers = [
  {
    id: "offer-1",
    title: "Summer Solstice Escape",
    description: "Indulge in 4+ nights at our premier coastal resorts with complimentary spa sessions.",
    priceOff: 25,
    expiryDate: "Aug 31, 2026",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "offer-2",
    title: "Luxury Suite Weekend Getaway",
    description: "Complimentary gourmet dinner and late check-out included for couples.",
    priceOff: 20,
    expiryDate: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "offer-3",
    title: "Business Executive Stay",
    description: "High-speed optical fiber connectivity, boardroom access, and airport transfers.",
    priceOff: 15,
    expiryDate: "Oct 10, 2026",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop"
  }
];

export const testimonials = [
  {
    id: "test-1",
    name: "Dr. Jonathan Mitchell",
    address: "Manhattan, New York",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    review: "QuickStay provided an unforgettable experience. The penthouse suite in Paris exceeded all expectations with its panoramic views and exceptional concierge service."
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    address: "Zurich, Switzerland",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    rating: 5,
    review: "The seamless instant booking and effortless Stripe payment made organizing our family vacation to Santorini completely stress-free. Highly recommended!"
  },
  {
    id: "test-3",
    name: "Marcus Aurelius Vance",
    address: "London, United Kingdom",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    review: "From the curated property listings to the verified owner communications, QuickStay represents the gold standard of modern luxury hospitality apps."
  }
];

export const roomsDummyData = [
  {
    id: "room-101",
    hotel: {
      name: "The Ritz Palm Grand Palace",
      address: "742 Evergreen Terrace, Central District",
      city: "New York",
      rating: 4.9,
      reviewsCount: 320,
      owner: {
        name: "Arthur Pendelton",
        phone: "+1 (555) 234-8901",
        email: "concierge@ritzgrand.com",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Luxury Suite",
    pricePerNight: 420,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Free Breakfast", "Air Conditioning", "Spa & Wellness", "Fitness Center"],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Experience modern elegance in our signature Luxury Suite with high-floor skyline panoramas, Italian marble bathrooms, custom velvet plush king bed, and acoustic soundproofing.",
    isAvailable: true
  },
  {
    id: "room-102",
    hotel: {
      name: "Hôtel De L'Étoile Champs",
      address: "18 Rue de Rivoli, 8th Arrondissement",
      city: "Paris",
      rating: 4.8,
      reviewsCount: 245,
      owner: {
        name: "Claire Delacroix",
        phone: "+33 1 42 68 55 00",
        email: "reservations@etoile-paris.fr",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Double Bed",
    pricePerNight: 280,
    amenities: ["Free Wi-Fi", "Free Breakfast", "Air Conditioning", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Classic Parisian charm paired with 21st-century luxury. Steps away from luxury fashion houses, featuring bespoke French oak furnishings, hand-poured toiletries, and sunrise balcony views.",
    isAvailable: true
  },
  {
    id: "room-103",
    hotel: {
      name: "Burj Mirage Luxury Marina",
      address: "Al Marsa St, Dubai Marina District",
      city: "Dubai",
      rating: 4.95,
      reviewsCount: 512,
      owner: {
        name: "Sheikh Tariq Al-Mansoor",
        phone: "+971 4 399 9999",
        email: "vip@burjmirage.ae",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Penthouse Villa",
    pricePerNight: 890,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Spa & Wellness", "Ocean View", "Free Parking", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "The pinnacle of Arabian grandeur. Private infinity pool overlooking superyacht docks, personal 24-hour butler, private helicopter pad coordination, and Hermès bathroom amenities.",
    isAvailable: true
  },
  {
    id: "room-104",
    hotel: {
      name: "The Mayfair Royal Crown",
      address: "Berkley Square, Mayfair",
      city: "London",
      rating: 4.75,
      reviewsCount: 198,
      owner: {
        name: "Sir Nigel Kensington",
        phone: "+44 20 7499 1000",
        email: "reservations@mayfairroyal.co.uk",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Family Suite",
    pricePerNight: 360,
    amenities: ["Free Wi-Fi", "Free Breakfast", "Fitness Center", "Free Parking"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "An aristocratic sanctuary in the heart of London. Sprawling two-bedroom residence featuring handcrafted mahogany woodwork, afternoon high-tea service, and bespoke city excursions.",
    isAvailable: true
  },
  {
    id: "room-105",
    hotel: {
      name: "Ryokan Shinjuku Zen Haven",
      address: "Kabukicho 2-Chome, Shinjuku",
      city: "Tokyo",
      rating: 4.88,
      reviewsCount: 410,
      owner: {
        name: "Kenjiro Takahashi",
        phone: "+81 3 3200 4567",
        email: "zen@shinjukuhaven.jp",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Single Bed",
    pricePerNight: 145,
    amenities: ["Free Wi-Fi", "Spa & Wellness", "Air Conditioning", "Free Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "A tranquil sanctuary amidst the bustling energy of Tokyo. Authentic tatami flooring, hinoki wood onsen soaking tubs, matcha tea rituals, and minimalist Japanese craftsmanship.",
    isAvailable: true
  },
  {
    id: "room-106",
    hotel: {
      name: "Villa Bellini Oceanfront Resort",
      address: "Oia Cliffside Walk 44",
      city: "Santorini",
      rating: 4.97,
      reviewsCount: 388,
      owner: {
        name: "Kostas Papadopoulos",
        phone: "+30 2286 071234",
        email: "stay@bellinisantorini.gr",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
      }
    },
    roomType: "Luxury Suite",
    pricePerNight: 550,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Ocean View", "Free Breakfast", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Whitewashed Aegean caldera cliff suite with private heated plunge pool, unhindered world-famous sunset vistas, Greek wine cellar, and private yacht charter reservations.",
    isAvailable: true
  }
];

export const userBookingsDummyData = [
  {
    id: "book-981",
    bookingId: "QS-2026-9810",
    hotel: {
      name: "The Ritz Palm Grand Palace",
      address: "742 Evergreen Terrace, Central District, New York"
    },
    room: {
      id: "room-101",
      roomType: "Luxury Suite",
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"]
    },
    checkInDate: "2026-10-14",
    checkOutDate: "2026-10-18",
    guests: 2,
    totalPrice: 1680,
    isPaid: true,
    paymentMethod: "Stripe (Card ending in 4242)",
    createdAt: "2026-10-01"
  },
  {
    id: "book-982",
    bookingId: "QS-2026-9811",
    hotel: {
      name: "Hôtel De L'Étoile Champs",
      address: "18 Rue de Rivoli, Paris, France"
    },
    room: {
      id: "room-102",
      roomType: "Double Bed",
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop"]
    },
    checkInDate: "2026-11-05",
    checkOutDate: "2026-11-08",
    guests: 2,
    totalPrice: 840,
    isPaid: false,
    paymentMethod: "Pending Payment",
    createdAt: "2026-10-04"
  }
];
