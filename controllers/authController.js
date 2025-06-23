const User = require('../models/User');

// Render Login Page
exports.getLogin = (req, res) => {
  res.render('auth/login');
};

// Render Signup Page
exports.getSignup = (req, res) => {
  res.render('auth/signup');
};

// Handle Signup
exports.postSignup = async (req, res) => {
  const { name, email, password, admin } = req.body; // ✅ Grab 'admin' checkbox

  if (!name || !email || !password) {
    return res.redirect('/signup');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect('/signup');
    }

    const isAdmin = admin === 'on'; // ✅ Check if admin checkbox is selected

    const user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin,
      role: isAdmin ? 'admin' : 'user'
    });

    await user.save();

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;

    return res.redirect(user.isAdmin ? '/admin' : '/dashboard');

  } catch (err) {
    console.error('Signup Error:', err);
    return res.redirect('/signup');
  }
};

// Handle Login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;

    return res.redirect(user.isAdmin ? '/admin' : '/dashboard');

  } catch (err) {
    console.error('Login Error:', err);
    return res.redirect('/login');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
