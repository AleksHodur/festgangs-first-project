const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');

router.post('/', groupController.group_new);

router.get('/new/:id', groupController.group_new_form)

module.exports = router;