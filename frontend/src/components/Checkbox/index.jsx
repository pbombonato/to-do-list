import styles from "./Checkbox.module.css";

import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../../constants";
import { Context } from "../../context/taskContext";

function Checkbox({ task }) {
  const { updateTask } = useContext(Context);

  function toggleCheck(task) {
    axios
      .put(baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: !task.isChecked,
      })
      .then((resp) => {
        updateTask(resp.data);
      });
  }

  return (
    <div className={styles["div-checkbox"]}>
      <input
        type="checkbox"
        name={'checkbox-'+task.id}
        id={`checkbox-${task.id}`}
        defaultChecked={task.isChecked}
        onChange={() => toggleCheck(task)}
      />
      <label htmlFor={`checkbox-${task.id}`} className={styles.checkmark} />
    </div>
  );
}

export default Checkbox;
