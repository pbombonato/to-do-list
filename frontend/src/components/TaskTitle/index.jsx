import styles from "./TaskTitle.module.css";

import { useContext, useRef } from "react";
import axios from "axios";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TaskTitle({ task }) {
  const { updateTaskFromContext } = useContext(Context);
  const inputRef = useRef();

  function controlInput(task, showInput = false) {
    axios
      .put(baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: task.isChecked,
        showInput: showInput,
      })
      .then((resp) => {
        updateTaskFromContext(resp.data);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newTitle = inputRef.current.value;

    axios
      .put(baseUrl + "/" + task.id, {
        title: newTitle,
        isChecked: task.isChecked,
        showInput: false,
      })
      .then((resp) => {
        updateTaskFromContext(resp.data);
      });
  }

  return (
    <div className={styles["div-title"]}>
      {task.showInput ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            defaultValue={task.title}
            aria-label="Type a new task title"
            onBlur={() => controlInput(task, false)}
          />
        </form>
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
