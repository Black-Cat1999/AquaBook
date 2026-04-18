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

});
