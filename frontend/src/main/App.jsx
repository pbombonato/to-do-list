import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { TaskContext } from "../context/taskContext";

import "./App.css";

import Header from "../templates/Header";
import TaskTable from "../components/TaskTable";
import Footer from "../templates/Footer";

const App = () => (
  <TaskContext>
    <div className="app">
      <Header />
      <TaskTable />
      <Footer />
    </div>
  </TaskContext>
);

export default App;
