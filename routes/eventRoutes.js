const express = require('express');
const router = express.Router(); //router object

const eventController = require('../controllers/eventController');

router.get('/', eventController.event_get_all);

module.exports = router;