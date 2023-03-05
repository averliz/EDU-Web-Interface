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
import Table from "./components/Table";
import ApiData from "./components/ApiData";

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

  const tableHeaders = ["ID", "Name", "Description", "Price"];
  const tableData = [
    ["1", "Product 1", "Product Description 1", "$100"],
    ["2", "Product 2", "Product Description 2", "$200"],
    ["3", "Product 3", "Product Description 3", "$300"],
  ];

  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<h1>Welcome to SB Admin 2</h1>} />
          <Route
            path="/dashboard"
            element={
              <div>
                <ApiData />
              </div>
            }
          />
          <Route
            path="/tables"
            element={<Table headers={tableHeaders} data={tableData} />}
          />
          <Route path="/forms" element={<Form />} />
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
