const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtil');

// Função de login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Remover espaços em branco da senha
  const trimmedPass = password.trim();

  // Verificação para garantir que nome de usuário e senha são fornecidos
  if (!username || !trimmedPass) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    // Tenta encontrar o usuário pelo nome de usuário
    const user = await User.findOne({ username });

    // Se o usuário não for encontrado
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    // Verificação da senha
    const validPassword = await bcrypt.compare(trimmedPass, user.password);

    // Se a senha não for válida
    if (!validPassword) {
      return res.status(400).json({ error: 'Senha inválida.' });
    }

    // Gera o token de autenticação
    const token = generateToken({ id: user._id });

    // Retorna o token de autenticação
    return res.json({ message: 'Login realizado com sucesso!', token });

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
};

// Função de registro
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  // Verificação para garantir que nome de usuário, senha e email sejam fornecidos
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Nome de usuário, senha e email são obrigatórios.' });
  }

  try {
    // Verifica se o nome de usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe.' });
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do novo usuário
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    // Salva o novo usuário no banco
    await newUser.save();

    // Gera o token para o novo usuário
    const token = generateToken({ _id: newUser._id });

    // Retorna a resposta com o token
    return res.status(201).json({
      message: 'Cadastro realizado com sucesso!',
      token
    });

  } catch (err) {
    console.error('Erro ao registrar o usuário:', err);
    return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
};
