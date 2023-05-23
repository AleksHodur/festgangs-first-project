const express = require('express');
const router = express.Router(); //router object

const eventController = require('../controllers/eventController');

router.get('/', eventController.event_get_all);

router.get('/:id', eventController.event_get_by_id);

module.exports = router;