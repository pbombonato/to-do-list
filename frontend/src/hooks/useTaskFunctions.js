import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../constants";
import { Context } from "../context/taskContext";

function useTaskFunctions() {
  const { state, addTask, updateTask, clearTask, clearOldTask } =
    useContext(Context);

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

  return { save, saveOnEnter };
}

export default useTaskFunctions;
