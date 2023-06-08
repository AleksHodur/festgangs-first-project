const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/events', adminController.admin_view_events);

router.put('/event', adminController.admin_edit_event);

module.exports = router;