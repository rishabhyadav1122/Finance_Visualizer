const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Rent", "Entertainment", "Shopping", "Transport", "Other"], // Add categories
    required: true,
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);