const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookingRoutes = require('./routes/bookings');
const tableRoutes   = require('./routes/tables');
const reviewRoutes  = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const statsRoutes   = require('./routes/stats');

app.use('/api/bookings', bookingRoutes);
app.use('/api/tables',   tableRoutes);
app.use('/api/reviews',  reviewRoutes);
app.use('/api/contact',  contactRoutes);
app.use('/api/stats',    statsRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('AquaBook backend is running ✅');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });