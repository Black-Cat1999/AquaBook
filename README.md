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

## 🛠️ Technology Stack
- **HTML5:** Semantic architecture (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
- **CSS3:** Custom Variables, Flexbox, Grid Layouts, rich gradients, and smooth transition animations.
- **Vanilla JavaScript:** Event Listeners, Fetch API (async/await), DOM Manipulation, Local Storage.

---

## 📂 Project Structure

```text
├── index.html           # Landing page (Hero, Features, Testimonials, Modal)
├── facilities.html      # Portfolio Map (Table Gallery with filters, Skills, PDF)
├── about.html           # Blog style page (Typography focus)
├── support.html         # Contact Form, Character Counter, FAQ, Currency Converter
├── style.css            # Global CSS, theming variables, responsive media queries
├── main.js              # Interactivity, DOM manipulation, API handling
├── pricing-brochure.pdf # Required PDF download
└── images/              # Assets for the website
    ├── hero.png
    ├── about-hero.webp
    ├── 8ball-1.jpg
    ├── snooker-1.jpg
    └── vip-1.jpg
```

---

## 🚀 Running Locally

Because this project is built entirely strictly with standard-compliant HTML/CSS/JS, no build step or node package installation is required.

1. Clone the repository: `git clone <your-repo-link>`
2. Open the directory.
3. Open `index.html` in your favorite web browser, or use VS Code's **Live Server** extension for real-time CSS/JS reloading.

## 🤝 Project By
Created for Full Stack Development Mini Project.
