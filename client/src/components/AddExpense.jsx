import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useExpenses  } from "../store/ExpenseContext";
import { toast } from "react-toastify";

function AddExpenseForm({ isEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addExpense  , fetchExpenses} = useExpenses(); // Use context
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (isEdit && id) {
      fetch(`https://finance-visualizer-snowy.vercel.app/api/transactions/getTransaction/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        // .then(()=>fetchExpenses())
        .catch((err) => console.error("Error fetching expense:", err));
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount: Number(formData.amount),
      description: formData.description,
      date: formData.date,
    };

    if (isEdit) {
      // Update Expense
      try {
        const response = await fetch(
          `https://finance-visualizer-snowy.vercel.app/api/transactions/updateTransaction/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData),
          }
        );

        if (response.ok) {
          fetchExpenses()
          Swal.fire({
                      title: "Updated!",
                      text: "The expense has been Updated.",
                      background: "#1a202c",  
                      color: "#fff",  
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                    });
          navigate("/expenses"); 
          console.log(response)
        }
      } catch (error) {
        const errorData = await error.response.json(); // Parse the error response
      
        if (errorData?.errors?.length > 0) {
          const errorMessage = errorData.errors.map(err => `${err.path}: ${err.message}`).join("\n");
      
          Swal.fire({
            title: "Validation Error",
            text: errorMessage,
            icon: "error",
            background: "#121212",
            color: "#fff",
            confirmButtonColor: "#d33"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
            background: "#121212",
            color: "#fff",
            confirmButtonColor: "#d33"
          });
        }
      }
      
    } else {
      // Add New Expense using Context
      addExpense(expenseData);
      navigate("/expenses");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Edit Expense" : "Add New Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          {isEdit ? "Update Expense" : "Add Expense"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddExpenseForm;
