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

  useEffect(() => {
    fetchExpenses(),
    getAllSummary()
    getCatSummary()
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
console.log(response, "line-56")
      if (response.ok) {
        Swal.fire({
          title: "Added!",
          text: "The expense has been Added.",
          background: "#1a202c",  
          color: "#fff",  
          icon: "success",
          confirmButtonColor: "#3085d6",
        });       
         await fetchExpenses(); // Fetch updated expenses immediately
      }
      else {
        // console.log(response.json(),"line-69")
        const errorData = await response.json();
        console.log(errorData.errors[0].message)
        const errorMessage = errorData.errors[0].message
        Swal.fire({
          title: "Validation Error",
          text: errorMessage || "Failed to Add the expense.",
          icon: "error",
          background: "#1a202c",
          color: "#fff",
          confirmButtonColor: "#d33"
        });
        

      
    }
  } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to Add the expense.",
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
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense  , fetchExpenses , categories  , getCategory , summary , setSummary , catSummary , setCatSummary,getCatSummary , getAllSummary }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
};
