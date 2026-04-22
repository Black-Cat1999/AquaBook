const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Table name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Table type is required'],
    enum: ['8ball', 'snooker', 'vip']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Table', tableSchema);
