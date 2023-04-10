import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import SubmitReviewForm from "./components/SubmitReviewForm";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <div>
                <Dashboard />
              </div>
            }
          />
          <Route path="/forms" element={<SubmitReviewForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
