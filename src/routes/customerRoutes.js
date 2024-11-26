const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); // Corrija se necessário o caminho

// Rota para listar todos os clientes
router.get('/', customerController.getAllCustomers);

// Rota para buscar cliente por ID
router.get('/:id', customerController.getCustomerById);

// Rota para criar cliente
router.post('/', customerController.createCustomer);

// Rota para atualizar cliente
router.put('/:id', customerController.updateCustomer);

// Rota para excluir cliente
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
