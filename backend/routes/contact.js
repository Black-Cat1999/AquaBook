const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contact — Fetch all contact messages (admin use)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contact — Save a contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields: name, email, and message.' });
  }

  try {
    const contact = new Contact({ name, email, message });
    const saved = await contact.save();
    res.status(201).json({ message: 'Message received! We will get back to you soon.', data: saved });
  } catch (err) {
    // Mongoose validation error (e.g. bad email format)
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: msg });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
