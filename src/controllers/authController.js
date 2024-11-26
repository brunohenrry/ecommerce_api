const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtil');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Usuário não encontrado.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Senha inválida.');

    const token = generateToken({ _id: user._id });
    res.send({ token });
  } catch (err) {
    res.status(500).send('Erro no servidor.');
  }
};
