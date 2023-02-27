import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Header from "../templates/Header";
import TaskTable from "../components/TaskTable";
import Footer from "../templates/Footer";

const App = () => (
  <div className="app">
    <Header />
    <TaskTable />
    <Footer />
  </div>
);

export default App;
