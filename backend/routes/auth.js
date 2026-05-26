const express = require('express');
const container = require('../container');

const router = express.Router();
const authController = container.resolve('authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
