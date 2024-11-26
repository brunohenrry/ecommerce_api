const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (payload) => {
  // Verifica se a chave secreta está definida
  if (!process.env.JWT_SECRET) {
    throw new Error('30a4bb327a7faf822fd7634a28d9491becd89a6c402bf3295c1a7399e4c1516d');
  }

  // Gera o token JWT com a chave secreta e o tempo de expiração
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
