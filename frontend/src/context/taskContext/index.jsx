import { createContext, useCallback, useReducer } from "react";
import { initialState } from "./data";
import { reducer } from "./reducer";
import { actions } from "./actions";

export const Context = createContext();

export const TaskContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTaskToContextList(payload) {
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

  const updateTaskList = useCallback(
    (payload) => {
      dispatch({ type: "UPDATE_TASK_LIST", payload });
    },
    [dispatch]
  );

  return (
    <Context.Provider
      value={{
        state,
        addTaskToContextList,
        updateTask,
        removeTask,
        clearTask,
        clearOldTask,
        updateNewTaskTitle,
        updateTaskTitle,
        updateTaskList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
