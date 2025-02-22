const express = require('express');
const router = express.Router();
const budgetController = require("../controllers/budget-controller")

// All budget routes
router.route("/getAllBudget").get(budgetController.getAllBudgets)
router.route("/updateCategoryBudget").post(budgetController.updateCategoryBudget)

module.exports = router
