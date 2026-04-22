const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews — Submit a new review
router.post('/', async (req, res) => {
  const { name, tableType, rating, comment } = req.body;

  // Validation
  if (!name || !tableType || !rating || !comment) {
    return res.status(400).json({ error: 'Please fill in all fields: name, tableType, rating, and comment.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  try {
    const review = new Review({ name, tableType, rating: Number(rating), comment });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews — Get all reviews (newest first)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
