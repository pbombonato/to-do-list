import styles from "./InputRow.module.css";

import { useState } from "react";

import useTaskFunctions from "../../hooks/useTaskFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InputRow() {
  const { saveNewTaskToDB } = useTaskFunctions();
  const [taskTitle, setTaskTitle] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setTaskTitle(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveNewTaskToDB(taskTitle);
    setTaskTitle("");
  }

  return (
    <form onSubmit={handleSubmit} id={styles["input-form"]}>
      <div className={styles["div-title"]}>
        <input
          type="text"
          name="title"
          aria-label="Insert new task"
          value={taskTitle}
          onChange={handleChange}
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

  // return (
  //   <div className={styles["div-row"]} id={styles["input-row"]}>
  //     <div className={styles["div-title"]}>
  //       <input
  //         type="text"
  //         name="title"
  //         value={state.task.title}
  //         onChange={(e) => updateNewTaskTitle(e.target.value)}
  //         placeholder="New task"
  //         onKeyDownCapture={(e) => saveOnEnter(e, state.task)}
  //         autoFocus
  //       />
  //     </div>

  //     <div className={styles["div-btns"]}>
  //       <button className="btn" onClick={(e) => save(state.task)}>
  //         <FontAwesomeIcon icon={faPlus} />
  //       </button>
  //     </div>
  //   </div>
  // );
}
