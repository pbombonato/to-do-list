import { useContext } from "react";
import axios from "axios";

import useTaskFunctions from "../../hooks/useTaskFunctions";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TaskTitle({ task, complete }) {
  const { saveOnEnter } = useTaskFunctions();
  const { updateTask, updateTaskTitle } = useContext(Context)

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
