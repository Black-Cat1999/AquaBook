document.addEventListener('DOMContentLoaded', () => {
  // --- Feature 9: Dark/Light Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  // Check for saved theme in localStorage
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleText(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');

      if (theme === 'dark') {
        theme = 'light';
      } else {
        theme = 'dark';
      }

      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateToggleText(theme);
    });
  }

  function updateToggleText(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.innerText = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  }

  // --- Feature 6: Modal Popup logic ---
  const modal = document.getElementById('booking-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.querySelector('.close-btn');

  // Open modal on active buttons
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('show');
    });
  });

  // Close modal on X click
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // --- Feature 8: Image Grid Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to current
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Feature 5: Live Character Counter ---
  const messageInput = document.getElementById('message');
  const charCountDisplay = document.getElementById('char-count');
  const maxChars = 200;

  if (messageInput && charCountDisplay) {
    messageInput.addEventListener('input', () => {
      const remaining = maxChars - messageInput.value.length;
      charCountDisplay.textContent = `${remaining} characters remaining`;
      if (remaining < 20) {
        charCountDisplay.style.color = '#ff4d4d'; // Warning color
      } else {
        charCountDisplay.style.color = '#888';
      }
    });
  }

  // --- Feature 4: Collapsible FAQ Section ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Toggle the active class on the parent item
        item.classList.toggle('active');
      });
    }
  });

  // --- Feature 7: Currency Converter UI & Fetch API ---
  const convertBtn = document.getElementById('convert-btn');
  const currencyAmount = document.getElementById('currency-amount');
  const currencySelect = document.getElementById('currency-select');
  const conversionResult = document.getElementById('conversion-result');

  if (convertBtn && currencyAmount && currencySelect && conversionResult) {
    convertBtn.addEventListener('click', async () => {
      const amount = parseFloat(currencyAmount.value);
      const targetCurrency = currencySelect.value;

      if (isNaN(amount) || amount <= 0) {
        conversionResult.textContent = 'Please enter a valid amount.';
        return;
      }

      conversionResult.textContent = 'Fetching current rates...';

      try {
        // Using a free open API for exchange rates. Base is usually USD or EUR.
        // We assume our pool price base is USD.
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        if (data.result === "success") {
          const rate = data.rates[targetCurrency];
          if (rate) {
            const converted = (amount * rate).toFixed(2);
            conversionResult.textContent = `${amount} USD = ${converted} ${targetCurrency}`;
          } else {
            conversionResult.textContent = `Conversion rate for ${targetCurrency} not found.`;
          }
        } else {
          conversionResult.textContent = 'Error fetching exchange rates.';
        }
      } catch (error) {
        console.error('Error fetching currency:', error);
        conversionResult.textContent = 'Failed to fetch rates. Please try again.';
      }
    });
  }

  // ── Set min date on booking form (prevent past dates) ──
  const bookingDateInput = document.getElementById('booking-date');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
  }

  // --- Backend Feature: Submit Booking Form ---
  const bookingForm   = document.getElementById('booking-form');
  const bookingStatus = document.getElementById('booking-status');
  const submitBtn     = document.getElementById('booking-submit-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name      = document.getElementById('booking-name').value.trim();
      const phone     = document.getElementById('booking-phone') ? document.getElementById('booking-phone').value.trim() : '';
      const date      = document.getElementById('booking-date').value;
      const timeSlot  = document.getElementById('booking-slot').value;
      const tableType = document.getElementById('booking-table').value;

      // Front-end validation
      if (!name || !date || !timeSlot || !tableType) {
        bookingStatus.style.color = '#ff4d4d';
        bookingStatus.textContent = 'Please fill in all required fields.';
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Booking...';
      bookingStatus.style.color = '#888';
      bookingStatus.textContent = 'Submitting...';

      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, date, timeSlot, tableType })
        });

        const data = await response.json();

        if (response.ok) {
          bookingStatus.style.color = '#4caf50';
          bookingStatus.textContent = '✅ Booking confirmed! See you soon.';
          bookingForm.reset();
          // Auto-close modal after 2 seconds
          setTimeout(() => {
            if (modal) modal.classList.remove('show');
            bookingStatus.textContent = '';
          }, 2000);
        } else {
          // 409 = double booking conflict — show specific message
          bookingStatus.style.color = '#ff4d4d';
          bookingStatus.textContent = `⚠️ ${data.error}`;
        }
      } catch (err) {
        bookingStatus.style.color = '#ff4d4d';
        bookingStatus.textContent = '🚫 Could not connect to server. Is the backend running?';
      } finally {
        // Always re-enable the button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirm Booking';
      }
    });
  }

  // ── Reviews: Load & Display ──────────────────────────────────

  function starsHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return `<span style="color:#f5c518; font-size:1.1rem; letter-spacing:2px;">${stars}</span>`;
  }

  function tableLabel(type) {
    if (type === '8ball')   return '🎱 8-Ball';
    if (type === 'snooker') return '🎯 Snooker';
    if (type === 'vip')     return '👑 VIP Room';
    return type;
  }

  async function loadReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    try {
      const res  = await fetch('http://localhost:5000/api/reviews');
      const data = await res.json();

      if (!data.length) {
        grid.innerHTML = '<div style="text-align:center; color:#888; grid-column:1/-1; padding:30px;">No reviews yet. Be the first to leave one below! ⬇️</div>';
        return;
      }

      // Show only the 3 most recent
      const latest = data.slice(0, 3);
      grid.innerHTML = latest.map(r => `
        <div class="testi-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            ${starsHTML(r.rating)}
            <span style="font-size:0.78rem; color:#666; background:var(--card-bg); padding:2px 10px; border-radius:20px; border:1px solid var(--border-color);">
              ${tableLabel(r.tableType)}
            </span>
          </div>
          <p style="font-style:italic; margin-bottom:12px;">"${r.comment}"</p>
          <div class="testi-author">— ${r.name}</div>
        </div>
      `).join('');
    } catch (err) {
      grid.innerHTML = '<div style="text-align:center; color:#888; grid-column:1/-1; padding:30px;">Could not load reviews. Backend not running?</div>';
    }
  }

  // Load reviews on page startup
  loadReviews();

  // ── Reviews: Interactive Star Picker ──
  let selectedRating = 0;
  const stars = document.querySelectorAll('.star');

  stars.forEach(star => {
    // Hover — highlight up to hovered star
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.getAttribute('data-value'));
      stars.forEach(s => {
        s.textContent = parseInt(s.getAttribute('data-value')) <= val ? '★' : '☆';
        s.style.color = parseInt(s.getAttribute('data-value')) <= val ? '#f5c518' : '';
      });
    });

    // Mouse leave — revert to selected
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => {
        const v = parseInt(s.getAttribute('data-value'));
        s.textContent = v <= selectedRating ? '★' : '☆';
        s.style.color = v <= selectedRating ? '#f5c518' : '';
      });
    });

    // Click — lock in the rating
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      document.getElementById('review-rating').value = selectedRating;
    });
  });

  // ── Reviews: Submit Form ──
  const reviewForm      = document.getElementById('review-form');
  const reviewStatus    = document.getElementById('review-status');
  const reviewSubmitBtn = document.getElementById('review-submit-btn');

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name      = document.getElementById('review-name').value.trim();
      const tableType = document.getElementById('review-table').value;
      const rating    = document.getElementById('review-rating').value;
      const comment   = document.getElementById('review-comment').value.trim();

      if (!name || !tableType || !rating || !comment) {
        reviewStatus.style.color = '#ff4d4d';
        reviewStatus.textContent = 'Please fill in all fields and select a star rating.';
        return;
      }

      reviewSubmitBtn.disabled = true;
      reviewSubmitBtn.textContent = 'Submitting...';
      reviewStatus.style.color = '#888';
      reviewStatus.textContent = 'Posting your review...';

      try {
        const res  = await fetch('http://localhost:5000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, tableType, rating: Number(rating), comment })
        });
        const data = await res.json();

        if (res.ok) {
          reviewStatus.style.color = '#4caf50';
          reviewStatus.textContent = '✅ Review submitted! Thank you.';
          reviewForm.reset();
          selectedRating = 0;
          stars.forEach(s => { s.textContent = '☆'; s.style.color = ''; });
          // Refresh the displayed reviews
          loadReviews();
          setTimeout(() => { reviewStatus.textContent = ''; }, 3000);
        } else {
          reviewStatus.style.color = '#ff4d4d';
          reviewStatus.textContent = `⚠️ ${data.error}`;
        }
      } catch (err) {
        reviewStatus.style.color = '#ff4d4d';
        reviewStatus.textContent = '🚫 Could not connect to server.';
      } finally {
        reviewSubmitBtn.disabled = false;
        reviewSubmitBtn.textContent = 'Submit Review';
      }
    });
  }

  // ── Contact Form: Submit to backend ──────────────────────────

  const contactForm      = document.getElementById('contact-form');
  const contactStatus    = document.getElementById('contact-status');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        contactStatus.style.color = '#ff4d4d';
        contactStatus.textContent = 'Please fill in all fields.';
        return;
      }

      // Loading state
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.textContent = 'Sending...';
      contactStatus.style.color = '#888';
      contactStatus.textContent = 'Submitting your message...';

      try {
        const res  = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();

        if (res.ok) {
          contactStatus.style.color = '#4caf50';
          contactStatus.textContent = '✅ ' + data.message;
          contactForm.reset();
          // Reset char counter
          const charCount = document.getElementById('char-count');
          if (charCount) charCount.textContent = '200 characters remaining';
        } else {
          contactStatus.style.color = '#ff4d4d';
          contactStatus.textContent = `⚠️ ${data.error}`;
        }
      } catch (err) {
        contactStatus.style.color = '#ff4d4d';
        contactStatus.textContent = '🚫 Could not connect to server. Is the backend running?';
      } finally {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.textContent = 'Send Message';
      }
    });
  }

  // ── Stats: Fetch aggregated stats for bookings.html ──────────

  async function loadStats() {
    // Only run on bookings.html (stat cards exist on that page)
    const statTotal   = document.getElementById('stat-total');
    const stat8ball   = document.getElementById('stat-8ball');
    const statSnooker = document.getElementById('stat-snooker');
    const statVip     = document.getElementById('stat-vip');
    if (!statTotal) return; // Not on bookings page, skip

    try {
      const res  = await fetch('http://localhost:5000/api/stats');
      const data = await res.json();

      if (!res.ok) return;

      // Fill the 4 existing cards from real aggregation
      statTotal.textContent   = data.total;
      stat8ball.textContent   = data.byType['8ball']   || 0;
      statSnooker.textContent = data.byType['snooker'] || 0;
      statVip.textContent     = data.byType['vip']     || 0;

      // Inject a 5th "Most Booked Date" card dynamically if not already there
      const statsSection = document.getElementById('stats-section');
      if (statsSection && !document.getElementById('stat-most-booked') && data.mostBookedDate.date !== 'N/A') {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
          <div class="stat-icon">🔥</div>
          <div class="stat-number" id="stat-most-booked" style="font-size:1.3rem;">${data.mostBookedDate.date}</div>
          <div class="stat-label">Most Booked Date (${data.mostBookedDate.count} bookings)</div>
        `;
        statsSection.appendChild(card);
      }
    } catch (err) {
      // Stats failing silently is fine — the table still loads
      console.warn('Could not load stats:', err.message);
    }
  }

  // Load stats on startup (works only on bookings.html)
  loadStats();

});

// --- Feature: Global Booking Form Validation ---
window.validateBookingField = function(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(errorId);
  if (!field || !errorSpan) return false;

  const value = field.value.trim();
  let isValid = true;
  let errorMsg = '';

  if (fieldId === 'b-name') {
    if (value.length < 3) {
      isValid = false;
      errorMsg = 'Name must be at least 3 characters.';
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      isValid = false;
      errorMsg = 'Only letters and spaces are allowed.';
    }
  } else if (fieldId === 'b-phone') {
    // Phone is optional in schema, but user requested validation for it
    if (value.length > 0) {
      if (!/^\d{10}$/.test(value)) {
        isValid = false;
        errorMsg = 'Phone must be exactly 10 digits.';
      } else if (!/^[6-9]/.test(value)) {
        isValid = false;
        errorMsg = 'Phone must start with 6, 7, 8, or 9.';
      }
    }
  } else if (fieldId === 'b-date') {
    if (!value) {
      isValid = false;
      errorMsg = 'Date is required.';
    } else {
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 30);

      if (selectedDate < today) {
        isValid = false;
        errorMsg = 'Date cannot be in the past.';
      } else if (selectedDate > maxDate) {
        isValid = false;
        errorMsg = 'Date cannot be more than 30 days in advance.';
      }
    }
  } else if (fieldId === 'b-table') {
    if (!value) {
      isValid = false;
      errorMsg = 'Please select a table type.';
    }
  }

  // Visual feedback
  if (!isValid && value !== '' && fieldId !== 'b-table') {
    field.style.border = '2px solid #e74c3c';
    errorSpan.textContent = errorMsg;
    errorSpan.style.color = '#e74c3c';
  } else if (isValid && value !== '') {
    field.style.border = '2px solid #00c878';
    errorSpan.textContent = '';
  } else {
    // Reset if empty (for optional fields or before typing)
    field.style.border = '';
    errorSpan.textContent = '';
  }

  return isValid;
};

window.checkAllFieldsValid = function() {
  const nameValid = window.validateBookingField('b-name', 'err-name');
  const dateValid = window.validateBookingField('b-date', 'err-date');
  const tableValid = window.validateBookingField('b-table', 'err-table');
  // Phone is optional, but if entered it must be valid
  const phoneVal = document.getElementById('b-phone') ? document.getElementById('b-phone').value.trim() : '';
  let phoneValid = true;
  if (phoneVal) phoneValid = window.validateBookingField('b-phone', 'err-phone');

  // timeSlot checking is handled in tryLoadSlots/UI manually, but for submit button state we check all
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    if (nameValid && dateValid && tableValid && phoneValid && window.selectedSlot) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
    }
  }
};
