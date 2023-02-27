import React from "react";

import "./Main.css";

const Main = ({ children }) => (
  <main className="content">
    <div>{children}</div>
  </main>
);

export default Main;
