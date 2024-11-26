const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require ("./routes/authRoutes")


// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configurar middleware para JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static('public'));

app.use("/api", authRoutes)


// Conectar ao MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Cluster-Prova',
    });
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);  // Encerra o processo caso a conexão falhe
  }
};

// Inicializar conexão com o banco de dados
connectToDatabase();

// Importar e configurar as rotas (aqui você deve importar e usar as rotas)
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
