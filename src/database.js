const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB bem-sucedida');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1); // Encerra o processo em caso de erro de conexão
  }
};

module.exports = connectDB;
