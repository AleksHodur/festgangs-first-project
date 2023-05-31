const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.get('/', signupController.signup_index);

router.post('/', signupController.signup_new_user);

module.exports = router;