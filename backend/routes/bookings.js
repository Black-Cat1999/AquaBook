const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings — Create a new booking
router.post('/', async (req, res) => {
  const { name, phone, date, timeSlot, tableType } = req.body;

  // Validation — required fields
  if (!name || !date || !timeSlot || !tableType) {
    return res.status(400).json({ error: 'Please fill in all fields: name, date, time slot, and table type.' });
  }

  try {
    // ── Double-booking check ──
    // Same table + same date + same time slot cannot be booked twice
    const conflict = await Booking.findOne({ date, timeSlot, tableType });
    if (conflict) {
      return res.status(409).json({
        error: `This ${tableType} table is already booked on ${date} at ${timeSlot}. Please choose a different slot.`
      });
    }

    const booking = new Booking({ name, phone: phone || '', date, timeSlot, tableType });
    const saved = await booking.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings — Get all bookings (newest first)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/availability?date=YYYY-MM-DD&tableType=8ball
// Returns which time slots are already booked for that date + table combo
router.get('/availability', async (req, res) => {
  const { date, tableType } = req.query;

  if (!date || !tableType) {
    return res.status(400).json({ error: 'date and tableType query params are required.' });
  }

  try {
    const booked = await Booking.find({ date, tableType }).select('timeSlot -_id');
    const bookedSlots = booked.map(b => b.timeSlot);
    res.json({ date, tableType, bookedSlots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/bookings/:id/status — Update booking status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookings/:id — Cancel a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.json({ message: 'Booking cancelled successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
