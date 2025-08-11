const express = require('express');
const router = express.Router();
const AuthController = require('./auth/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/verify', authMiddleware, AuthController.verifyToken);

module.exports = router;