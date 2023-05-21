const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/inSession', userController.user_get_in_session);

router.get('/profile', userController.user_show_profile)

router.get('/{id}', userController.user_by_id);

router.put('/{id}', userController.user_update)

module.exports = router;