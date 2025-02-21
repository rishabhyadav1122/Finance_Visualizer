import { createContext, useContext, useEffect, useReducer, useState } from "react";

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      return action.payload;
    case "ADD_EXPENSE":
      return [action.payload, ...state]; // Add new expense at the beginning
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense._id !== action.payload);
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchExpenses();
  }, []);


  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://finance-visualizer-snowy.vercel.app/api/transactions/getTransaction");
      if (response.ok) {
        const data = await response.json();
        const sortedExpenses = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Reverse order
        dispatch({ type: "SET_EXPENSES", payload: sortedExpenses });
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };



  const addExpense = async (expense) => {
    setLoading(true);
    try {
      const response = await fetch("https://finance-visualizer-snowy.vercel.app/api/transactions/addTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        await fetchExpenses(); // Fetch updated expenses immediately
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setLoading(true);
      try {
        const response = await fetch(`https://finance-visualizer-snowy.vercel.app/api/transactions/deleteTransaction/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchExpenses(); // Fetch updated expenses immediately
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      } finally {
        setLoading(false);
      }
    }
}

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense  , fetchExpenses  }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
};
