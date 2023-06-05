const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');

router.post('/', groupController.group_new);

router.get('/3', groupController.group_by_id);

router.get('/new/:id', groupController.group_new_form);

router.get('/byEvent/:id', groupController.groups_by_event);

router.get('/myGroups', groupController.group_show_my);

module.exports = router;