import { createContext, useReducer } from "react";
import { initialState } from "./data";
import { reducer } from "./reducer";
import { actions } from "./actions";

export const Context = createContext();

export const TaskContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTask(payload) {
    dispatch({ type: actions.ADD_TASK, payload });
  }

  function updateTask(payload) {
    dispatch({ type: actions.UPDATE_TASK, payload });
  }

  function removeTask(payload) {
    dispatch({ type: actions.REMOVE_TASK, payload });
  }

  function clearTask() {
    dispatch({ type: actions.CLEAR_TASK });
  }

  function clearOldTask() {
    dispatch({ type: actions.CLEAR_OLD_TASK });
  }

  function updateNewTaskTitle(payload) {
    dispatch({ type: actions.UPDATE_NEW_TASK_TITLE, payload });
  }
  function updateTaskTitle(payload) {
    dispatch({ type: actions.UPDATE_TASK_TITLE, payload });
  }

  return (
    <Context.Provider
      value={{
        state,
        addTask,
        updateTask,
        removeTask,
        clearTask,
        clearOldTask,
        updateNewTaskTitle,
        updateTaskTitle,
      }}
    >
      {children}
    </Context.Provider>
  );
};
