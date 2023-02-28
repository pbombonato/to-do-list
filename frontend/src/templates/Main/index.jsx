import React from "react";

import styles from "./Main.module.css";

const Main = ({ children }) => (
  <main className={styles.content}>
    <div>{children}</div>
  </main>
);

export default Main;
