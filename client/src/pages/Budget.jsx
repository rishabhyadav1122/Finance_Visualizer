import { useState } from "react";
import { useExpenses } from "../store/ExpenseContext";

const BudgetPage = () => {
  const { budgets, setBudget ,updateCategoryBudget} = useExpenses();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Set Monthly Budgets</h2>

        <div className="space-y-4">
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-3 cursor-pointer rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>Select Category</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Shopping">Shopping</option>
  <option value="Other">Other</option>
</select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 cursor-pointer rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => updateCategoryBudget(category, parseFloat(amount))}
            className="w-full p-3 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all"
          >
            Set Budget
          </button>
        </div>

        <h3 className="text-lg font-semibold mt-6">Current Budgets</h3>
        <ul className="mt-3 space-y-2">
          {Object.entries(budgets).map(([cat, amt]) => (
            <li key={cat} className="bg-gray-700 p-2 rounded-md text-center">
              {cat}: <span className="font-semibold">₹{amt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetPage;
