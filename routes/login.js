const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');

router.get('/', controller.loginPage);
router.get('/logout', controller.logout)

router.post('/', controller.login);

module.exports = router;