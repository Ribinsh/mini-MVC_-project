const express = require('express');
const router = express.Router();
const controller = require('../controllers/signupController');

router.get('/', controller.signupPage);

router.post('/', controller.signup);

module.exports = router;