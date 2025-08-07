require('dotenv').config();

//  criação de servidores HTTP. Ele é usado para definir rotas, middleware, manipulação de requisições, entre outras coisas.
const express = require('express');

//: Middleware para interpretar cookies que vêm com as requisições HTTP. Ele é importante quando você está manipulando autenticação baseada em cookies.
const cookieParser = require('cookie-parser');

// Permite que o servidor aceite requisições de origens diferentes (domínios diferentes)
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
const protectedRoutes = require('./routes/protected.routes.js');

const app = express();

app.use(express.json()); // Permite que o servidor analise o corpo das requisições HTTP em formato JSON
app.use(cookieParser()); // Permite que os cookies presentes nas requisições sejam analisados e acessados de maneira mais simples.

// Conexão com o banco de dados
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error(err));


// Rotas
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));