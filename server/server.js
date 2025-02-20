const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./utils/db');
const transactionsRoute = require('./router/transaction-router')



// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

// app.use(errorMiddleware)
 

// Routes
app.use('/api/transactions', transactionsRoute);


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});