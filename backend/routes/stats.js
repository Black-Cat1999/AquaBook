const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET /api/stats — Aggregated stats from the bookings collection
router.get('/', async (req, res) => {
  try {
    // 1. Total count
    const total = await Booking.countDocuments();

    // 2. Count per tableType using aggregation
    const byType = await Booking.aggregate([
      {
        $group: {
          _id: '$tableType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation result array into a simple object: { '8ball': 3, snooker: 1, vip: 2 }
    const countByType = { '8ball': 0, snooker: 0, vip: 0 };
    byType.forEach(item => {
      countByType[item._id] = item.count;
    });

    // 3. Most booked date using aggregation
    const mostBookedResult = await Booking.aggregate([
      {
        $group: {
          _id: '$date',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const mostBookedDate = mostBookedResult.length > 0
      ? { date: mostBookedResult[0]._id, count: mostBookedResult[0].count }
      : { date: 'N/A', count: 0 };

    res.json({
      total,
      byType: countByType,
      mostBookedDate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
