import { useContext } from "react";
import axios from "axios";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TaskTitle({ task, complete }) {
  const {
    state,
    updateTaskTitle,
    updateTask,
    clearOldTask,
    clearTask,
    addTask,
  } = useContext(Context);

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

  function save(taskDB) {
    const task = taskDB.showInput ? { ...state.oldTask } : { ...state.task };

    task.isChecked = taskDB.isChecked;

    const method = taskDB.id ? "put" : "post";

    const url = taskDB.id
      ? `${baseUrl}/${taskDB.id}`
      : baseUrl;

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
    <div className="div-title">
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
          className={complete ? "complete" : ""}
        >
          {task.title}
        </span>
      )}
    </div>
  );
}

export default TaskTitle;
