const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/inSession', userController.user_get_in_session);

router.get('/profile', userController.user_show_profile)

router.get('/profile/:id', userController.user_show_other_profile)

router.get('/exists/name/:username', userController.user_by_name);

router.get('/exists/email/:email', userController.user_by_email);

router.get('/inGroup/:group', userController.user_get_id_by_group);

router.get('/byGroup/:group_id', userController.user_get_by_group);

router.get('/:id', userController.user_by_id);

router.put('/:id', userController.user_update);


module.exports = router;