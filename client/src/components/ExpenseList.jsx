import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { Edit2, Trash2 , IndianRupee, IndianRupeeIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExpenses } from "../store/ExpenseContext";


function ExpenseCard({ expense }) {
  const navigate = useNavigate();
  const { deleteExpense } = useExpenses();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <p className="text-2xl font-bold text-white flex">
        <IndianRupeeIcon className="w-6 h-6 mt-1" />
        {expense.amount}
      </p>
      <p className='text-yellow-300'>{expense.category}</p>
      <p className="text-gray-400">{expense.description}</p>
      <p className="text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
      <div className="mt-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/edit/${expense._id}`)}
          className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          <Edit2 className="w-4 h-4 mr-2" /> Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => deleteExpense(expense._id)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </motion.button>
      </div>
    </motion.div>
  );
}


function ExpenseList() {
  const { expenses, loading } = useExpenses(); // Get loading state from context
  const navigate  = useNavigate()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!expenses.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No expenses found. Add some expenses to get started!</p>
      </div>
    );
  }

  // Group expenses by month and year
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(expense);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      {Object.entries(groupedExpenses).map(([monthYear, expenses]) => (
        <div key={monthYear}>
<h2 className="text-xl font-semibold text-white flex gap-5 mb-4">
  {monthYear}
  <button 
    onClick={() => navigate(`/visualize/${monthYear}`)}
    className="bg-purple-600 cursor-pointer text-white px-4 py-2  rounded-lg hover:bg-purple-700 transition-all"
  >
    Visualize
  </button>
</h2>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;