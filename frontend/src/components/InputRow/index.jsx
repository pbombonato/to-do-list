import styles from "./InputRow.module.css";

import { useRef } from "react";

import useTaskFunctions from "../../hooks/useTaskFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InputRow() {
  const { saveNewTaskToDB } = useTaskFunctions();

  const taskTitleRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const taskTitle = taskTitleRef.current.value;

    saveNewTaskToDB(taskTitle);

    taskTitleRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} id={styles["input-form"]}>
      <div className={styles["div-title"]}>
        <input
          type="text"
          name="title"
          ref={taskTitleRef}
          aria-label="Insert new task"
          placeholder="New task"
          autoComplete="off"
          autoFocus
        />
      </div>

      <div className={styles["div-btns"]}>
        <button type="submit" className="btn" aria-label="Submit task">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
}
