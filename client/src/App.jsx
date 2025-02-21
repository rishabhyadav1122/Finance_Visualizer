import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import MonthlyChart from "./pages/MonthlyChart";
import Analytics from "./pages/Analytics";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        className="min-h-screen bg-gray-900 text-white"
      >
        <Routes location={location}>
          <Route
            path="/*"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/visualize/:monthYear"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <MonthlyChart />
              </motion.div>
            }
          />
          <Route
            path="/analytics"
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Analytics />
              </motion.div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
