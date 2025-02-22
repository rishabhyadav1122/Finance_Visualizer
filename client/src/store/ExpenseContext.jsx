import { createContext, useContext, useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      return action.payload;
    case "ADD_EXPENSE":
      return [action.payload, ...state]; 
    case "DELETE_EXPENSE": 
      return state.filter((expense) => expense._id !== action.payload);
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);
  const [loading, setLoading] = useState(true); // New loading state
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState([]);
  const [catSummary, setCatSummary] = useState(null); // State to store summary data
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    fetchExpenses()
    getAllSummary()
    getCatSummary()
    fetchBudgets()
  }, []);


  const getCategory = async () => {
    try {
      const response = await fetch('https://finance-visualizer-snowy.vercel.app/api/transactions/getCategory');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON response
      setCategories(data); // Update the state with the fetched categories
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  // Fetch summary
  const getCatSummary = async () => {
    try {
      const response = await fetch('https://finance-visualizer-snowy.vercel.app/api/transactions/getCatSummary');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCatSummary(data); // Update the summary state
      return data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  };

  const getAllSummary = async () => {
    try {
      const response = await fetch('https://finance-visualizer-snowy.vercel.app/api/transactions/getAllSummary');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSummary(data); // Update the summary state
      return data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  };


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
    console.log(response, "line-56");
    const totalSpending = expenses
  .filter((e) => e.category === expense.category)
  .reduce((sum, e) => sum + e.amount, 0) + expense.amount;

const categoryBudget = budgets[expense.category] || 0; // Get the category budget

if (categoryBudget && totalSpending > categoryBudget) {
  const { isConfirmed } = await Swal.fire({
    title: "Budget Exceeded!",
    text: `Adding this expense will exceed your budget for ${expense.category}. Do you still want to proceed?`,
    icon: "warning",
    background: "#1a202c",
    color: "#fff",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, add it!",
  });

  if (!isConfirmed) {
    setLoading(false);
    return;
  }
}

if (response.ok) {
  Swal.fire({
    title: "Added!",
    text: "The expense has been added.",
    background: "#1a202c",
    color: "#fff",
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
  await fetchExpenses(); // Fetch updated expenses immediately
} else {
  const errorData = await response.json();
  console.log(errorData.errors[0].message);
  const errorMessage = errorData.errors[0].message;
  Swal.fire({
    title: "Validation Error",
    text: errorMessage || "Failed to add the expense.",
    icon: "error",
    background: "#1a202c",
    color: "#fff",
    confirmButtonColor: "#d33",
  });
}} catch (error) {
  Swal.fire({
  title: "Error!",
  text: "Failed to add the expense.",
  background: "#1a202c",
  color: "#fff",
  icon: "error",
  confirmButtonColor: "#d33",
  });
  console.error("Error adding expense:", error);
  } finally {
  setLoading(false);
  }
  };



  const fetchBudgets = async () => {
    try {
      // Use fetch to make a GET request
      const response = await fetch("https://finance-visualizer-snowy.vercel.app/api/budgets/getAllBudget");
  
      const data = await response.json();
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
  
      // Transform the data into the desired format
      const budgetData = data.reduce((acc, curr) => {
        acc[curr.category] = curr.amount;
        return acc;
      }, {});
  
      // Update state with the transformed data
      setBudgets(budgetData);
    } catch (error) {
      console.error("Error fetching budgets:", error.message);
    }
  };




  const updateCategoryBudget = async (category, amount) => {
    try {
      // Use fetch to make a POST request
      const response = await fetch("https://finance-visualizer-snowy.vercel.app/api/budgets/updateCategoryBudget", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ category, amount }), // Convert the data to JSON
      });
  
      const data = await response.json();
      // Check if the response is successful


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data from the response
  
      // Update the state with the new budget data
      if(response.ok)
      {
        setBudgets((prev) => ({ ...prev, [category]: data.amount }));
        Swal.fire({
          title: "Updated!",
          text: "The Budget has been Updated.",
          background: "#1a202c",  
          color: "#fff",  
          icon: "success",
          confirmButtonColor: "#3085d6",
        });  

      }else {
        Swal.fire({
          title: "Update Error",
          text:"Failed to Update the Budget.",
          icon: "error",
          background: "#1a202c",
          color: "#fff",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error("Error setting budget:", error.message);
    }
  };

  
 


const deleteExpense = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    background: "#1a202c",  // Dark background
    color: "#fff",  // White text
    showCancelButton: true,
    confirmButtonColor: "#d33",  // Red confirm button
    cancelButtonColor: "#3085d6",  // Blue cancel button
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://finance-visualizer-snowy.vercel.app/api/transactions/deleteTransaction/${id}`,
          { method: "DELETE" }
        );

        if (response.ok) {
          await fetchExpenses(); // Fetch updated expenses immediately
          Swal.fire({
            title: "Deleted!",
            text: "The expense has been deleted.",
            background: "#1a202c",  
            color: "#fff",  
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the expense.",
            background: "#1a202c",  
            color: "#fff",  
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          background: "#1a202c",  
            color: "#fff",  
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    }
  });
};



  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense  , fetchExpenses , categories  , getCategory , summary , setSummary , catSummary , setCatSummary,getCatSummary , getAllSummary , budgets,setBudgets , updateCategoryBudget , fetchBudgets }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
};
