const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware.js');
const { register, login, logout, getCurrentUser } = require('../controllers/auth.controller.js');

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rota protegida (requer autenticação)
router.get('/me', authenticate, getCurrentUser);

// Logout
router.post('/logout', logout);

module.exports = router;