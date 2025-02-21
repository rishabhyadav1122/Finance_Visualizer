// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MonthlyChart from "./pages/MonthlyChart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/visualize/:monthYear" element={<MonthlyChart />} />
        </Routes>
    </Router>
  );
}

export default App;
