import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpenseForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/edit/:id" element={<AddExpenseForm isEdit={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
