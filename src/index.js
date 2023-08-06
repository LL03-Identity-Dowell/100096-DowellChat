import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import DataContext from "./context/data-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  const [collectedData, setCollectedData] = useState(null);
  return (
    <HashRouter>
      <DataContext.Provider value={{ collectedData, setCollectedData }}>
        <App />
      </DataContext.Provider>
    </HashRouter>
  );
};

root.render(<Index />);
