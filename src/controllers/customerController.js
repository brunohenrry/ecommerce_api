const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).send('Erro ao buscar clientes.');
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Cliente não encontrado.');
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).send('Erro ao buscar o cliente.');
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).send('Erro ao criar o cliente.');
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) return res.status(404).send('Cliente não encontrado.');
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).send('Erro ao atualizar o cliente.');
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('Cliente não encontrado.');
    res.status(200).send('Cliente excluído com sucesso.');
  } catch (err) {
    res.status(500).send('Erro ao excluir o cliente.');
  }
};
