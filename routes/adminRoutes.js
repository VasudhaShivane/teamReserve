const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuth } = require('../middleware/auth');
const { ensureAdmin } = require('../middleware/admin');

router.get('/admin', ensureAuth, ensureAdmin, adminController.getAdminDashboard);

module.exports = router;
