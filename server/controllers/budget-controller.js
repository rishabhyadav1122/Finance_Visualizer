const Budget = require("../models/budget-model")


// Get all Category-wise budget
const getAllBudgets = async(req , res) =>{
    try {
        const budgets = await Budget.find();
        res.json(budgets);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}


//Update the Category Budget
const updateCategoryBudget = async (req , res)=>{
    try {
        const { category, amount } = req.body;
    
        // Use findOneAndUpdate with upsert option
        const budget = await Budget.findOneAndUpdate(
          { category }, // Filter by category
          { amount },   // Update the amount
          { 
            upsert: true, // Create a new document if it doesn't exist
            new: true,    // Return the updated document
            setDefaultsOnInsert: true // Ensure default values are set if creating a new document
          }
        );
    
        res.json(budget);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

module.exports = {getAllBudgets , updateCategoryBudget}