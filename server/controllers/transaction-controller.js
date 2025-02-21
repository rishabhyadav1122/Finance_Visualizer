const Transaction = require('../models/transaction-model');

// Add a transaction
const addTransaction = async (req, res) => {
  const { amount, date, description  , category } = req.body;
  try {
    const transaction = await Transaction.create({ amount, date, description , category  });
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

//Get All Categories
const getAllCategory =  (req,res) =>{
  const categories = ["Food", "Rent", "Entertainment", "Shopping", "Transport", "Other"];
  res.json(categories);
} 


// Get Category wise summary
const getCatSummary = async (req,res) =>{
  try {
    const catsummary = await Transaction.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);
    res.json(catsummary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category summary", error });
  }
}

const getAllSummary = async (req, res) => {
  try {
    // Total Expenses
    const totalExpenses = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Category Breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    // Most Recent Transactions (Limit to last 5)
    const recentTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalExpenses: totalExpenses[0]?.total || 0,
      categoryBreakdown,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error });
  }
};



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

module.exports = { addTransaction, getTransactions,getAllCategory, updateTransaction, deleteTransaction , getCatSummary , getAllSummary};