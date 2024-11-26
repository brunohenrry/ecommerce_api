const Order = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId').populate('products');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send('Erro ao buscar pedidos.');
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId')
      .populate('products');
    if (!order) return res.status(404).send('Pedido não encontrado.');
    res.status(200).json(order);
  } catch (err) {
    res.status(500).send('Erro ao buscar o pedido.');
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).send('Erro ao criar o pedido.');
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).send('Pedido não encontrado.');
    res.status(200).json(order);
  } catch (err) {
    res.status(400).send('Erro ao atualizar o pedido.');
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send('Pedido não encontrado.');
    res.status(200).send('Pedido excluído com sucesso.');
  } catch (err) {
    res.status(500).send('Erro ao excluir o pedido.');
  }
};
