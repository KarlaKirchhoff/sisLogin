const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware.js');

// Todas as rotas aqui requerem autenticação
router.use(authenticate);

// Exemplo de rota protegida
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Bem-vindo ao dashboard', userId: req.userId });
});

module.exports = router;