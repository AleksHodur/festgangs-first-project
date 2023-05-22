const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');

router.post('/', groupController.group_new);

module.exports = router;