import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useParams, useNavigate } from "react-router-dom";
import { useExpenses } from "../store/ExpenseContext"; // Import the context

const MonthlyChart = () => {
  const { monthYear } = useParams(); // Get month from URL
  const { expenses } = useExpenses(); // Get expenses from context
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Array.isArray(expenses)) {
          console.error("Error: Expenses data is not an array");
          return;
        }

        let totalExpense = 0;

        // Filter and group expenses by date
        const expensesByDate = expenses.reduce((acc, expense) => {
          if (!expense.date) return acc;

          const expenseDate = new Date(expense.date);
          const expenseMonthYear = `${expenseDate.toLocaleString('en-US', { month: 'long' })} ${expenseDate.getFullYear()}`;

          if (expenseMonthYear === monthYear) {
            totalExpense += expense.amount;

            const day = expenseDate.getDate();
            if (!acc[day]) acc[day] = 0;
            acc[day] += expense.amount;
          }

          return acc;
        }, {});

        // Convert grouped data into array format for Recharts
        const dailyData = Object.keys(expensesByDate).map((day) => ({
          date: `Day ${day}`,
          amount: expensesByDate[day],
        }));

        setData(dailyData);
        setTotalExpense(totalExpense);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    };

    fetchData();
  }, [monthYear, expenses]);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">
          {monthYear} - Expense Overview
        </h1>
      </div>

      <h2 className="text-xl text-center">
        Total Expense: <span className="font-bold text-red-400">₹{totalExpense}</span>
      </h2>

      <div className="mt-8">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-400 mt-4">No expenses recorded for this month.</p>
        )}
      </div>
      <div className="flex justify-center">
        <button 
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Back to Expenses
        </button>
      </div>
    </div>
  );
};

export default MonthlyChart;