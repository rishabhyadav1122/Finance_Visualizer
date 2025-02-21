import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useExpenses } from "../store/ExpenseContext";

const COLORS = [
    "#FF6F61", // Coral
    "#6B5B95", // Lavender
    "#88B04B", // Sage Green
    "#F7CAC9", // Rose Quartz
    "#92A8D1", // Soft Blue
    "#955251", // Mahogany
    "#B565A7", // Dusty Purple
    "#009B77", // Tropical Green
    "#DD4124", // Fiery Red
    "#D65076", // Blush Pink
    "#45B8AC", // Aqua
    "#EFC050", // Sunflower Yellow
    "#5B5EA6", // Ultra Violet
    "#9B2335", // Crimson
    "#DFCFBE", // Sand
    "#55B4B0", // Ocean Green
    "#E15D44", // Burnt Orange
    "#7FCDCD", // Sky Blue
    "#BC243C", // Ruby Red
    "#C3447A", // Fuchsia
  ];

const Analytics = () => {
  const {expenses , summary, catSummary, getAllSummary, getCatSummary } = useExpenses();
  
  useEffect(() => {
    getCatSummary();
    getAllSummary()
  }, [expenses]);

  const categoryData = summary?.categoryBreakdown || [];
  const recentTransactions = summary?.recentTransactions || [];
  const totalExpenses = summary?.totalExpenses || 0;



  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      
    {/* Pie Chart */}
    <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Expenses by Category</h3>
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
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
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