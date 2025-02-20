import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

function ExpenseCard({ expense, onDelete }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <p className="text-2xl font-bold text-white">${expense.amount}</p>
      <p className="text-gray-400">{expense.description}</p>
      <p className="text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
      <div className="mt-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/edit/${expense.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center"
        >
          <Edit2 className="w-4 h-4 mr-2" /> Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(expense.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </motion.button>
      </div>
    </motion.div>
  );
}

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions/getTransaction');
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/transactions/deleteTransaction/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setExpenses(expenses.filter(expense => expense.id !== id));
        }
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
        />
      ))}
      {expenses.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No expenses found. Add some expenses to get started!
        </div>
      )}
    </div>
  );
}

export default ExpenseList;