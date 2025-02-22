const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["Food", "Rent", "Entertainment", "Shopping", "Transport", "Other"], // Add categories
        required: true,
      },
  amount: {
    type:Number,
    default:3000,
    required:true
  }
});

module.exports = mongoose.model("Budget", budgetSchema);
