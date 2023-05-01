const express = require('express');
const router = express.Router(); //router object
const loginController = require('../controllers/loginController');

router.get('/', loginController.login_index);

/**Para cerrar la sesión */
router.get('/close', loginController.login_close);

router.post('/', loginController.login_check);

module.exports = router;