// usada para criar e verificar tokens JWT.
// Ela fornece métodos como jwt.sign() para gerar tokens e jwt.verify() para validá-los.
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Chave secreta do JWT, fora do código-fonte.

//Esta função cria um novo JWT. O token é gerado a partir do identificador de usuário (userId), que será incluído no payload do token.
const generateToken = (userId) => {
    // jwt.sign(): O primeiro parâmetro é o payload do token ({ userId })
    // O payload pode conter qualquer tipo de informação que você queira codificar no token.
    // O segundo parâmetro é a chave secreta (process.env.JWT_SECRET), que é usada para assinar o token e garantir que ele não tenha sido alterado.
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Após esse tempo, o token expira e não pode mais ser usado para autenticação.
    }); // retorna o JWT gerado, que é uma string codificada.
}; // Será usada quando você quiser criar um novo token JWT para um usuário (por exemplo, após um login bem-sucedido).

// Esta função verifica a validade de um token JWT. Ela recebe o token como parâmetro e o valida usando a chave secreta.
const verifyToken = (token) => {
    // O primeiro parâmetro é o token que será verificado.
    //O segundo parâmetro é a chave secreta usada para validar o token.
    return jwt.verify(token, process.env.JWT_SECRET);
    // Se o token for válido e não tiver expirado, jwt.verify() retorna o payload original que foi codificado no token,
    // Se o token for inválido ou expirado, o método lança um erro,
}; // A função verifica a autenticidade de um token passado como argumento, validando sua assinatura com a chave secreta.

module.exports = { generateToken, verifyToken };