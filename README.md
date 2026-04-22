# AquaBook 🎱
**Premium Pool & Snooker Booking Platform**

![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)

Access the live deployed website here: [https://aqua-book-tau.vercel.app/](https://aqua-book-tau.vercel.app/)

---

## 📖 About the Project
AquaBook is a premium 4-page frontend website designed for a college Full-Stack Development mini-project. It allows users to view facilities, read about the club's philosophy, and "book" professional 8-ball pool and snooker tables. 

The project was built purely with Vanilla HTML, CSS, and JavaScript. It completely satisfies the 9 key assignment requirements without the use of any external frameworks or libraries.

---

## ✨ Assignment Requirements Implemented

This project successfully integrates all 9 requested features:

1. **Responsive Landing Page:** Features a hero section, compelling features area, player testimonials, and a CTA button built with semantic HTML and Flexbox/Grid CSS.
2. **Multi-Section Portfolio Page:** The `facilities.html` page acts as our portfolio, showcasing table setups, coach skills (using progress bars), a downloadable PDF brochure, and a contact form on the Support page.
3. **Typography-Focused Blog Page:** The `about.html` page features a beautifully formatted article with a drop-cap, blockquote, optimal line-height, and an author tag natively styled via CSS.
4. **Collapsible FAQ Section:** Located on the `support.html` page, these FAQs expand and collapse dynamically via JavaScript DOM manipulation.
5. **Live Character Counter:** Built into the Contact Form's message `<textarea>`, actively tracking character limits natively via JS.
6. **Modal Popup:** Clicking "Book a Table Now" on the landing page fires a reservation popup that can be closed by clicking the "X" or clicking outside the container.
7. **Real-Time Currency Converter:** Built into the `support.html` page, fetching live cross-border exchange rates utilizing a free, open conversion API.
8. **Category-Based Image Grid:** A responsive CSS Grid gallery of our tables that can be instantly filtered by category (8-Ball, Snooker, VIP) using Vanilla JS.
9. **Dark/Light Theme Toggle:** A globally persistent theme switch located in the navbar using CSS custom properties (`--variables`) and JavaScript's `localStorage`.

---

## 🚀 Deployment Links
- **Frontend (Vercel):** [https://aqua-book-tau.vercel.app/](https://aqua-book-tau.vercel.app/)
- **Backend (Render):** [https://aquabook-u419.onrender.com/](https://aquabook-u419.onrender.com/)

---

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)

---

## 📂 Project Structure
```text
├── index.html           # Landing page
├── user.html            # Main booking form with live validation
├── payment.html         # Mock payment gateway & processing
├── bookings.html        # Public view of all reservations
├── admin.html           # Admin dashboard for managing bookings
├── style.css            # Global CSS & Design System
├── main.js              # Frontend logic & API handlers
└── backend/             # Node.js Express server & MongoDB models
```

---

## 🚀 Running Locally

1. Clone the repository: `git clone <your-repo-link>`
2. Open the directory.
3. Start the backend: `cd backend && npm install && npm start`
4. Open `index.html` in your browser.

## 🤝 Project By
Created for Full Stack Development Mini Project.
