const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// GET /api/tables — Return all active tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find({ isActive: true });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
