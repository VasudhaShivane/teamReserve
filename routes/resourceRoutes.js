const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { ensureAuth } = require('../middleware/auth');

router.get("/", resourceController.getHome);

router.get('/dashboard', ensureAuth, resourceController.getDashboard);
router.get('/resource', ensureAuth, resourceController.getResourceForm);
router.post('/resource', ensureAuth, resourceController.addResource);

// View single resource
router.get('/resource/view/:id', ensureAuth, resourceController.viewResource);

// Edit form
router.get('/resource/edit/:id', ensureAuth, resourceController.getEditResource);

// Update post
router.post('/resource/edit/:id', ensureAuth, resourceController.updateResource);

// Delete
router.post('/resource/delete/:id', ensureAuth, resourceController.deleteResource);


module.exports = router;
