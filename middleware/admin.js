exports.ensureAdmin = (req, res, next) => {
  if (req.session.userId && req.session.isAdmin) {
    return next();
  }
  return res.status(403).send('Access denied. Admins only.');
};
