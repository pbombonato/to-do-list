import React from "react";
import "./Main.css";

const Main = (props) => (
  <main className="content">
    <div>{props.children}</div>
  </main>
);

export default Main;
