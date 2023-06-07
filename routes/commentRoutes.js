const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.get('/byGroup/:group', commentController.comment_get_by_group);

router.post('/', commentController.comment_post_new);

module.exports = router;