const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');

router.post('/', groupController.group_new);

router.get('/new/:id', groupController.group_new_form);

router.get('/byEvent/:id', groupController.groups_by_event);

router.get('/myGroups/json', groupController.group_json_my);

router.get('/myGroups', groupController.group_show_my);

router.get('/:id', groupController.group_by_id);

module.exports = router;