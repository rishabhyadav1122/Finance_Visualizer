import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useExpenses } from "../store/ExpenseContext";
import { CloudFog } from "lucide-react";

const COLORS = [
    "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1",
    "#955251", "#B565A7", "#009B77", "#DD4124", "#D65076",
    "#45B8AC", "#EFC050", "#5B5EA6", "#9B2335", "#DFCFBE",
    "#55B4B0", "#E15D44", "#7FCDCD", "#BC243C", "#C3447A",
];

const Analytics = () => {
  const { expenses, summary, budgets,setBudget,fetchBudgets, getAllSummary, getCatSummary } = useExpenses();

  useEffect(() => {
    getCatSummary();
    getAllSummary();
    fetchBudgets()
  }, [expenses]);

  const categoryData = summary?.categoryBreakdown || [];
  const totalExpenses = summary?.totalExpenses || 0;
  const recentTransactions = summary?.recentTransactions || [];

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      
      {/* Pie Chart */}
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Expenses by Category</h3>
        <h4 className="text-gray-400">Over-budget Categories are highlighted in Red</h4>
        {categoryData.length > 0 ? (
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={categoryData}
                dataKey="total"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {categoryData.map((entry, index) => {
                    const categoryName = entry._id; // Use correct category name
                    const expense = entry.total;

                    // Directly access budget from the object
                    const categoryBudget = budgets[categoryName] ?? Infinity;
                    const isOverLimit = expense > categoryBudget;

                    console.log("Category:", categoryName, " | Budget:", categoryBudget, " | Spent:", expense, " | Over Limit:", isOverLimit);

                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={isOverLimit ? "#FF0000" : COLORS[index % COLORS.length]} 
                      />
                    );
                  })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No category data available.</p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        
        {/* Total Expenses Card */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-200">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-400 mt-2">₹{totalExpenses}</p>
        </div>

        {/* Recent Transactions Card */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-200">Total Transactions</h3>
        <ul className="mt-4 space-y-2">
          {recentTransactions.length > 0 ? (
           recentTransactions.map((t) => (
              <li key={t._id} className="text-gray-300 flex justify-between">
                <span>{t.category}</span>
                <span className="text-red-400">₹{t.amount}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No recent transactions.</p>
          )}
        </ul>
      </div>

      </div>
    </div>
  );
};

export default Analytics;
