# QuickStay – Full Stack Luxury Hotel Booking Application
### CS3301 – Full Stack Development CIE-2 Assignment

---

## 📌 Project Overview
**QuickStay** is a modern, responsive full stack luxury hotel booking web application built with **React.js 19**, **Vite**, **Tailwind CSS v4**, **React Router v7**, **Lucide React**, and **React Hot Toast**. Inspired by GreatStack's hotel reservation architecture, QuickStay delivers an end-to-end luxury hospitality booking platform featuring real-time room discovery, destination filtering, multi-image interactive room galleries, automated stay calculations, guest reservation management, an interactive simulated Stripe checkout, and a dedicated Property Owner Management Portal.

The project strictly fulfills all **CS3301 Full Stack Development CIE-2 Rubric Evaluation Requirements** while implementing numerous enhancements and original modifications beyond standard tutorials.

---

## 🚀 Live Tech Stack
- **Library / Framework:** React.js 19 (Single Page Application Architecture)
- **Tooling & Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 with glassmorphism, fluid typography, and custom `@theme` variables
- **Client-Side Routing:** React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useNavigate`, `useParams`, `useLocation`)
- **Notifications:** React Hot Toast
- **Icons:** Lucide React & Vector Graphics
- **Typography:** Google Fonts (`Outfit` Sans-Serif & `Playfair Display` Serif)

---

## 📋 CIE-2 Rubric Evaluation Mapping

| # | CIE-2 Rubric Requirement | Implementation Details in QuickStay | Source Code Location |
|---|---|---|---|
| **1** | **Reusable React Components** | Modular UI components: `Navbar`, `Title`, `HotelCard`, `StarRating`, `Footer`, `ThemeToggleBtn`, `ScrollToTop` | [`src/components/`](file:///d:/FSD__CIE2/src/components/) |
| **2** | **At least ONE Class Component** | [`NotFound.jsx`](file:///d:/FSD__CIE2/src/components/NotFound.jsx): Extends `React.Component`, uses class `constructor(props)`, `this.state` countdown, lifecycle methods `componentDidMount()` & `componentWillUnmount()`, and custom class methods `handleRedirectNow()` and `handleManualRetry()`. | [`src/components/NotFound.jsx`](file:///d:/FSD__CIE2/src/components/NotFound.jsx) |
| **3** | **Functional Components for Major Sections** | `Hero`, `FeaturedDestination`, `ExclusiveOffers`, `Testimonial`, `Newsletter`, and full page views (`Home`, `AllRooms`, `RoomDetails`, `MyBookings`, `OwnerDashboard`, `AboutPage`, `ContactPage`). | [`src/components/`](file:///d:/FSD__CIE2/src/components/) & [`src/pages/`](file:///d:/FSD__CIE2/src/pages/) |
| **4** | **Parent-Child Component Communication** | `FeaturedDestination.jsx` (Parent) filters data and delegates props to `HotelCard.jsx` (Child); `AllRooms.jsx` communicates filter states to room cards; `App.jsx` communicates theme state to `Navbar.jsx` and `ThemeToggleBtn.jsx`. | [`src/components/FeaturedDestination.jsx`](file:///d:/FSD__CIE2/src/components/FeaturedDestination.jsx) → [`src/components/HotelCard.jsx`](file:///d:/FSD__CIE2/src/components/HotelCard.jsx) |
| **5** | **Props Passing** | Data attributes (`room`, `index`, `rating`, `size`, `showCount`, `reviewsCount`, `title`, `subtitle`, `align`, `font`, `badge`, `isDark`, `onToggleTheme`) received and consumed by child components. | [`src/components/HotelCard.jsx`](file:///d:/FSD__CIE2/src/components/HotelCard.jsx), [`src/components/Title.jsx`](file:///d:/FSD__CIE2/src/components/Title.jsx), [`src/components/StarRating.jsx`](file:///d:/FSD__CIE2/src/components/StarRating.jsx) |
| **6** | **useState Hook** | Used for theme toggling (`App.jsx`), mobile drawer (`Navbar.jsx`), destination and date search inputs (`Hero.jsx`), multi-parameter filters & search query (`AllRooms.jsx`), active gallery image & calculated stay cost (`RoomDetails.jsx`), reservations list & Stripe test modal (`MyBookings.jsx`), and Add Room form with live inventory (`OwnerDashboard.jsx`). | Across all major pages and components |
| **7** | **useEffect Hook** | Theme persistence (`localStorage.getItem` / `setItem` and DOM class mutation in `App.jsx`), sticky navbar scroll listener and cleanup in `Navbar.jsx`, URL parameter synchronization in `RoomDetails.jsx`, and window scroll reset in `ScrollToTop.jsx`. | [`src/App.jsx`](file:///d:/FSD__CIE2/src/App.jsx), [`src/components/Navbar.jsx`](file:///d:/FSD__CIE2/src/components/Navbar.jsx), [`src/components/ScrollToTop.jsx`](file:///d:/FSD__CIE2/src/components/ScrollToTop.jsx) |
| **8** | **Event Handling** | `onClick` (thumbnail gallery switch, room availability toggle, filter checkbox selection, Stripe pay now, mobile drawer), `onChange` (search query, date pickers, price checkboxes, sort radio buttons), `onSubmit` (controlled booking search, newsletter subscription, Add Room dispatch, contact form submission with `e.preventDefault()`). | `Hero`, `AllRooms`, `RoomDetails`, `MyBookings`, `OwnerDashboard`, `ContactPage` |
| **9** | **Form Handling** | Fully controlled forms: 1. Booking Search Form with HTML5 `datalist`; 2. Check-in/Check-out Availability Calculator Form; 3. Hotelier Add Room Form with live image preview; 4. Newsletter Subscription Form; 5. Contact Desk Form with client-side validation. | `Hero`, `RoomDetails`, `OwnerDashboard`, `Newsletter`, `ContactPage` |
| **10** | **Client-Side Routing** | Multi-route SPA routing (`/`, `/rooms`, `/rooms/:id`, `/my-bookings`, `/owner`, `/about`, `/contact`, `*`) using React Router DOM v7 without hard page refreshes. | [`src/App.jsx`](file:///d:/FSD__CIE2/src/App.jsx) & [`src/main.jsx`](file:///d:/FSD__CIE2/src/main.jsx) |
| **11** | **Responsive UI** | Mobile, tablet, laptop, and desktop layouts using Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`), collapsible hamburger menu, responsive 2-column filter drawer, and adaptive grids. | Full application styling |
| **12** | **Features Beyond Tutorial** | 1. Interactive Simulated Stripe Payment Modal with test cards & instant receipting; 2. Property Owner Dashboard (`/owner`) with live revenue/occupancy KPI metrics and instant room availability toggling; 3. Real-time Multi-Parameter Search & Filter Engine; 4. Dark/Light Mode Theme Switcher with `localStorage` persistence; 5. Mandatory Class Component 404 Page with countdown auto-redirect. | Described in detail below |

---

## ✨ Features Beyond The Tutorial (Original Innovations)

### Innovation 1: Interactive Simulated Stripe Payment Modal (`MyBookings.jsx`)
- Complete end-to-end payment settlement workflow for guest reservations.
- Clicking **"Pay Now"** opens an encrypted Stripe checkout modal pre-configured for test card numbers (`4242 4242 4242 4242`).
- Simulates an asynchronous 1.5-second authorization sequence, updates payment state from **Unpaid** (red dot) to **Paid & Confirmed** (green pulse dot), and provides instant receipt generation.

### Innovation 2: Hotel Owner Management Portal (`OwnerDashboard.jsx`)
- Specialized portal layout that automatically hides the customer navigation bar when accessed via `/owner` (conforming to `isOwnerPath` logic).
- Features 4 live KPI metric cards: **Total Revenue**, **Total Suites**, **Active Available Units**, and **Occupancy Rate (%)**.
- Includes a controlled **Add New Room** form featuring live suite image preview, category selector, price configuration, and amenity checklists.
- Includes an **Inventory Table** with an **Instant Availability Toggle** button to open or pause bookings for any suite with toast alerts.

### Innovation 3: Dynamic Multi-Parameter Filter & Search Engine (`AllRooms.jsx`)
- Real-time text search filtering across hotel names, cities, and street addresses.
- Multi-select room type checkboxes (*Single Bed, Double Bed, Luxury Suite, Family Suite, Penthouse Villa*).
- Multi-tier price range filtering (*$0-$150, $150-$300, $300-$500, $500-$1000, $1000+*).
- Dynamic sorting (*Price: Low to High, Price: High to Low, Highest Rated, Newest First*).
- Live match counter and automatic empty state with one-click filter reset.

### Innovation 4: Interactive Multi-Image Gallery with Live Stay Calculator (`RoomDetails.jsx`)
- Clickable secondary gallery thumbnails that instantly switch the main showcase photo with visual active ring indicators.
- Automatic stay calculator: computes the total number of nights and calculates total cost in real-time based on selected check-in and check-out dates.
- Reservation confirmation modal with full itinerary summary prior to saving to user bookings.

### Innovation 5: Class Component 404 Route (`NotFound.jsx`)
- Built specifically to address CIE-2 Rubric Requirement #2.
- Implements class `constructor`, `this.state = { countdown: 10, timestamp }`, and lifecycle hooks `componentDidMount()` (timer start) & `componentWillUnmount()` (timer cleanup to avoid memory leaks).

---

## 🗂️ Project Directory Structure

```text
D:/FSD__CIE2/
│
├── index.html                     # HTML5 entry with Google Fonts Outfit & Playfair Display
├── package.json                   # NPM dependencies (React 19, Tailwind v4, Router v7)
├── vite.config.js                 # Vite configuration with React and Tailwind v4 plugins
├── README.md                      # Comprehensive academic rubric documentation
├── .gitignore                     # Git ignore rules
│
└── src/
    ├── assets/
    │   └── assets.js              # Centralized hotel rooms, cities, amenities, offers, testimonials
    │
    ├── components/
    │   ├── Navbar.jsx             # Sticky glassmorphic nav, Clerk user profile emulation, drawer
    │   ├── Hero.jsx               # Hero banner with destination datalist search form
    │   ├── Title.jsx              # Reusable section title with Playfair typography & alignment
    │   ├── HotelCard.jsx          # Reusable hotel card with best seller badge & price details
    │   ├── StarRating.jsx         # Reusable 5-star rating renderer with fractional support
    │   ├── FeaturedDestination.jsx# Curated luxury hotels grid with view all navigation
    │   ├── ExclusiveOffers.jsx    # Seasonal discount cards with expiry countdown
    │   ├── Testimonial.jsx        # Verified guest memoirs with avatar and review quotes
    │   ├── Newsletter.jsx         # Controlled newsletter box with toast confirmation
    │   ├── Footer.jsx             # 4-column footer with brand, links, support, and copyright
    │   ├── NotFound.jsx           # Mandatory CIE-2 Class Component (404 with countdown lifecycle)
    │   ├── ThemeToggleBtn.jsx     # Dark/Light visual theme switch
    │   └── ScrollToTop.jsx        # Route change window scroll reset
    │
    ├── pages/
    │   ├── Home.jsx               # Landing page aggregating Hero, Featured, Offers, Reviews
    │   ├── AllRooms.jsx           # Complete room catalog with live search, filters, and sorting
    │   ├── RoomDetails.jsx        # Gallery preview, amenities, availability calculator, host info
    │   ├── MyBookings.jsx         # Guest reservations table with Stripe test payment checkout
    │   ├── OwnerDashboard.jsx     # Hotel owner portal with KPIs, Add Room form, inventory toggle
    │   ├── AboutPage.jsx          # Brand story, hospitality pillars, and global metrics
    │   └── ContactPage.jsx        # Controlled contact form with strict validation & FAQ accordion
    │
    ├── App.jsx                    # Root component with routing, theme state, and toast container
    ├── main.jsx                   # React 19 entry point wrapped with BrowserRouter and StrictMode
    └── index.css                  # Tailwind v4 setup with custom @theme variables & fonts
```

---

## 💻 How to Run the Project Locally

### Prerequisites
- Node.js (v18.0 or higher recommended, tested on v25.1.0)
- npm (v9.0 or higher, tested on v11.14.1)

### Execution Steps
```bash
# 1. Navigate to the project directory
cd d:/FSD__CIE2

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev

# 4. Open in web browser:
# http://localhost:5173
```

### Production Build & Verification
```bash
# Verify production build compilation
npm run build

# Preview production build locally
npm run preview
```

---


