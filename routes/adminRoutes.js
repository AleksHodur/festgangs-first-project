const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/events', adminController.admin_view_events);

router.put('/event', adminController.admin_edit_event);

router.delete('/event/:id', adminController.admin_delete_event);

module.exports = router;