exports.ensureAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

exports.ensureAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  return res.redirect('/dashboard'); // Block if not admin
};