const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController');

router.get('/', controller.home);

module.exports = router;