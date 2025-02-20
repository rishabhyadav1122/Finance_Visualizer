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
  }
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//   },
});

module.exports = mongoose.model('Transaction', TransactionSchema);