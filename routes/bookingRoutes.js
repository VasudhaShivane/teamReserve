const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAuth } = require('../middleware/auth');

router.get('/book/:id', ensureAuth, bookingController.getBookingForm);
router.post('/book', ensureAuth, bookingController.postBooking);
router.get('/my-bookings', ensureAuth, bookingController.getMyBookings);

module.exports = router;
