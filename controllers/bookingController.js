const Booking = require('../models/Booking');
const Resource = require('../models/Resource');

// ✅ Render booking form
exports.getBookingForm = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      req.session.error = "Resource not found.";
      return res.redirect('/dashboard');
    }

    res.render('bookingForm', { resource });
  } catch (err) {
    console.error('❌ Error loading booking form:', err);
    req.session.error = "Failed to load booking form.";
    res.redirect('/dashboard');
  }
};

// ✅ Handle booking with conflict prevention
exports.postBooking = async (req, res) => {
  try {
    const { resourceId, date, timeSlot } = req.body;
    const userId = req.session.userId;

    if (!resourceId || !date || !timeSlot) {
      req.session.error = "All fields are required.";
      return res.redirect(`/book/${resourceId}`);
    }

    const conflict = await Booking.findOne({ resourceId, date, timeSlot });
    if (conflict) {
      req.session.error = "⚠️ This time slot is already booked. Please choose another one.";
      return res.redirect(`/book/${resourceId}`);
    }

    await new Booking({ resourceId, userId, date, timeSlot }).save();
    req.session.success = "✅ Booking confirmed!";
    res.redirect('/my-bookings');

  } catch (err) {
    console.error('❌ Booking failed:', err);
    req.session.error = "Booking failed. Please try again.";
    res.redirect('/dashboard');
  }
};

// ✅ Show current user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.userId })
      .populate('resourceId')
      .sort({ date: 1 });

    res.render('myBookings', { bookings });
  } catch (err) {
    console.error('❌ Failed to load your bookings:', err);
    req.session.error = "Could not load bookings.";
    res.redirect('/dashboard');
  }
};
