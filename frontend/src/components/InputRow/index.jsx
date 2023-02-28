import { useContext } from "react";
import { Context } from "../../context/taskContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { baseUrl } from "../../constants";

export default function InputRow() {
  const {
    state,
    updateNewTaskTitle,
    updateTask,
    addTask,
    clearTask,
    clearOldTask,
  } = useContext(Context);

  function save(taskDB) {
    const task = taskDB.showInput ? { ...state.oldTask } : { ...state.task };

    task.isChecked = taskDB.isChecked;

    const method = taskDB.id ? "put" : "post";

    const url = taskDB.id ? `${baseUrl}/${taskDB.id}` : baseUrl;

    axios[method](url, task).then((resp) => {
      if (taskDB.showInput) {
        updateTask(resp.data);
        clearOldTask();
      } else {
        addTask(resp.data);
        clearTask();
      }
    });
  }

  function saveOnEnter(event, task) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) save(task);
  }

  return (
    <div className="div-row" id="first-row">
      <div className="div-title">
        <input
          className="input-text"
          type="text"
          name="title"
          value={state.task.title}
          onChange={(e) => updateNewTaskTitle(e.target.value)}
          placeholder="New task"
          onKeyDownCapture={(e) => saveOnEnter(e, state.task)}
          autoFocus
        />
      </div>

      <div className="div-btns">
        <button className="btn" onClick={(e) => save(state.task)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
