const express = require('express');
const router = express.Router();
const transactionController = require("../controllers/transaction-controller")
const validate = require("../middlewares/validate-middleware")
const transactionValidator = require("../validators/transaction-validator")

//All  transaction  routes
router.route("/getTransaction").get(transactionController.getTransactions)
router.route("/getCategory").get(transactionController.getAllCategory)
router.route("/getCatSummary").get(transactionController.getCatSummary)
router.route("/getAllSummary").get(transactionController.getAllSummary)
router.route("/addTransaction").post(validate(transactionValidator),transactionController.addTransaction)
router.route("/updateTransaction/:id").put(validate(transactionValidator),transactionController.updateTransaction)
router.route("/deleteTransaction/:id").delete(transactionController.deleteTransaction)


module.exports = router