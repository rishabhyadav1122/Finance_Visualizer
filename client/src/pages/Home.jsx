// Home.jsx
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Menu, Plus, List } from "lucide-react";
import { motion } from "framer-motion";
import AddExpenseForm from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import Sidebar from "../components/Sidebar";


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed top-4 left-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-all z-50"
        onMouseEnter={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </motion.div>
      
      <div onMouseLeave={() => setIsSidebarOpen(false)}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Finance Visualizer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Take control of your finances with our powerful expense tracking tool. 
            Visualize your spending patterns and make informed decisions.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-6 mb-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/add"
              className="px-6 py-3 bg-blue-600 rounded-lg flex items-center hover:bg-blue-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Expense
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/expenses"
              className="px-6 py-3 bg-purple-600 rounded-lg flex items-center hover:bg-purple-700 transition-all"
            >
              <List className="w-5 h-5 mr-2" /> View Expenses
            </Link>
          </motion.div>
        </div>

        <Routes>
          <Route path="/add" element={<AddExpenseForm />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/edit/:id" element={<AddExpenseForm isEdit={true} />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
