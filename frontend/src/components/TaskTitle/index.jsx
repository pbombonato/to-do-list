import styles from "./TaskTitle.module.css";

import { useContext } from "react";
import axios from "axios";

import useTaskFunctions from "../../hooks/useTaskFunctions";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TaskTitle({ task }) {
  const { saveOnEnter } = useTaskFunctions();
  const { updateTask, updateTaskTitle } = useContext(Context);

  function controlInput(task, showInput = false) {
    axios
      .put(baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: task.isChecked,
        showInput: showInput,
      })
      .then((resp) => {
        updateTask(resp.data);
      });
  }

  return (
    <div className={styles["div-title"]}>
      {task.showInput ? (
        <input
          type="text"
          defaultValue={task.title}
          onChange={(e) => updateTaskTitle(e.target.value)}
          onBlur={() => controlInput(task, false)}
          onKeyDownCapture={(e) => saveOnEnter(e, task)}
        />
      ) : (
        <span
          onDoubleClick={() => controlInput(task, true)}
          className={task.isChecked ? styles.complete : ""}
        >
          {task.title}
        </span>
      )}
    </div>
  );
}

export default TaskTitle;
