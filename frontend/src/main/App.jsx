import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Header from "../components/templates/Header";
import TaskCrud from "../components/tasks/TaskCrud";
import Footer from "../components/templates/Footer";

const App = () => (
  <div className="app">
    <Header />
    <TaskCrud />
    <Footer />
  </div>
);

export default App;
