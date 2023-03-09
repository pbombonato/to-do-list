import axios from "axios";
import { useContext } from "react";
import { baseUrl } from "../constants";
import { Context } from "../context/taskContext";

function useTaskFunctions() {
  const { addTaskToContext } = useContext(Context);

  function saveNewTaskToDB(NewTaskTitle) {
    const newTask = {
      title: NewTaskTitle,
      isChecked: false,
    };

    axios.post(baseUrl, newTask).then((resp) => {
      addTaskToContext(resp.data);
    });
  }

  return { saveNewTaskToDB };
}

export default useTaskFunctions;
