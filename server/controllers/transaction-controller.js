const Transaction = require('../models/transaction-model');

// Add a transaction
const addTransaction = async (req, res) => {
  const { amount, date, description } = req.body;
  try {
    const transaction = await Transaction.create({ amount, date, description });
    res.status(201).json({ message: "Transaction saved successfully", transaction });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {

    try {
    
    const transactions = await Transaction.find();
    
    res.status(200).json(transactions);
    
    } catch (err) {
    
    res.status(400).json({ error: err.message });
    
    }};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Transaction upadated successfully", transaction });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addTransaction, getTransactions, updateTransaction, deleteTransaction };