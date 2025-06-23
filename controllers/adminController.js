const Resource = require('../models/Resource');
const Booking = require('../models/Booking');
const User = require('../models/User');

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalResources = await Resource.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();

    res.render('admin/dashboard', {
      user: req.session.userId,
      totalResources,
      totalBookings,
      totalUsers
    });

  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
