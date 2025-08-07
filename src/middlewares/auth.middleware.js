const { verifyToken } = require('../config/jwt');

const authenticate = (req, res, next) => {
    // Recuperação do token
    // Verifica o token no cookie ou no header Authorization
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // Cookie: Se o token estiver armazenado como um cookie no navegador, ele pode ser acessado em req.cookies.token.
    // Cabeçalho de autorização (Authorization header): A partir do cabeçalho Authorization, o token geralmente é enviado com o prefixo Bearer, como no exemplo: Authorization: Bearer <token>.
    // A expressão req.headers.authorization?.split(' ')[1] divide a string e pega o segundo valor, que seria o token em si.

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    try {
        // Caso o token seja válido, a função retorna o payload (geralmente um objeto contendo o userId).
        const decoded = verifyToken(token);
        // O userId extraído do token será adicionado ao objeto req, permitindo que outras rotas ou middlewares tenham acesso ao ID do usuário autenticado.
        req.userId = decoded.userId;
        // O usuário foi autenticado com sucesso, e o próximo código pode ser executado normalmente.
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = authenticate;