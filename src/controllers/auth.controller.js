const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifica se usuário já existe
        // operador $or para buscar um usuário com o mesmo username ou email no banco de dados.
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário ou email já cadastrado' });
        }

        // Cria novo usuário
        const user = new User({ username, email, password });
        await user.save();

        // Gera token JWT
        const token = generateToken(user._id);

        // Configura o cookie
        res.cookie('token', token, {
            httpOnly: true,
            // secure é uma opção que garante que o cookie só será enviado em conexões HTTPS
            secure: process.env.NODE_ENV === 'production',
            // maxAge: 3600000 define que o cookie (e o token) expirará após 1 hora.
            maxAge: 3600000 // 1 hora
        });

        res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se usuário existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verifica a senha
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera token JWT
        const token = generateToken(user._id);

        // Configura o cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hora
        });

        res.json({ message: 'Login bem-sucedido', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout bem-sucedido' });
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

module.exports = { register, login, logout, getCurrentUser };