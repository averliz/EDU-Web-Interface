import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Card from "./components/Card";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import SubmitForm from "./components/SubmitForm";

const App = () => {
  const cardData = [
    {
      title: "Card Title 1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Card Title 2",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Card Title 3",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];



  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route
            path="/dashboard"
            element={
              <div>
                <Dashboard />
              </div>
            }
          />
          {/* <Route path="/dashboard-test" element={<ApiData test={true} />} /> */}
          <Route path="/forms" element={<SubmitForm />} />
          <Route
            path="/cards"
            element={cardData.map((card, index) => (
              <Card key={index} title={card.title} text={card.text} />
            ))}
          />
          {/* Add a default route that redirects to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
