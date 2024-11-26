const Product = require('../models/productModel');

// Criar um produto
exports.createProduct = async (req, res) => {
  try {
    // Verifica se os campos obrigatórios estão presentes
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando (name, price).' });
    }

    // Criar e salvar o produto
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product); // Retorna o produto criado com status 201
  } catch (err) {
    console.error('Erro ao criar o produto', err);
    res.status(500).json({ message: 'Erro ao criar o produto', error: err.message });
  }
};

// Obter um produto pelo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.status(200).json(product); // Retorna o produto encontrado com status 200
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar o produto', error: err.message });
  }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna o produto atualizado
    });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.status(200).json(product); // Retorna o produto atualizado
  } catch (err) {
    console.error('Erro ao atualizar o produto', err);
    res.status(500).json({ message: 'Erro ao atualizar o produto', error: err.message });
  }
};

// Excluir um produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.status(200).json({ message: 'Produto excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir o produto', err);
    res.status(500).json({ message: 'Erro ao excluir o produto', error: err.message });
  }
};

// Obter todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Retorna todos os produtos
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar os produtos', error: err.message });
  }
};
