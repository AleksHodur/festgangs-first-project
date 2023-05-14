const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/inSession', userController.user_get_in_session);

module.exports = router;