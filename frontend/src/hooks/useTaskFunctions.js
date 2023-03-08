import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../constants";
import { Context } from "../context/taskContext";

function useTaskFunctions() {
  const { state, addTaskToContextList, updateTask, clearTask, clearOldTask } =
    useContext(Context);

  function saveNewTaskToDB(NewTaskTitle) {
    const newTask = {
      title: NewTaskTitle,
      isChecked: false,
    };

    axios.post(baseUrl, newTask).then((resp) => {
      addTaskToContextList(resp.data);
    });
  }

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
        addTaskToContextList(resp.data);
        clearTask();
      }
    });
  }

  function saveOnEnter(event, task) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) save(task);
  }

  return { save, saveOnEnter, saveNewTaskToDB };
}

export default useTaskFunctions;
