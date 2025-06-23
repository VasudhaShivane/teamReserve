const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  date: {
    type: String,
    required: true  // Format: YYYY-MM-DD
  },
  timeSlot: {
    type: String,
    required: true  // Format: "10:00 AM - 11:00 AM"
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
