import { createContext, useCallback, useReducer } from "react";
import { initialState } from "./data";
import { reducer } from "./reducer";
import { actions } from "./actions";

export const Context = createContext();

export const TaskContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTaskToContext(payload) {
    dispatch({ type: actions.ADD_TASK, payload });
  }

  function updateTaskFromContext(payload) {
    dispatch({ type: actions.UPDATE_TASK, payload });
  }

  function removeTaskFromContext(payload) {
    dispatch({ type: actions.REMOVE_TASK, payload });
  }

  function clearTask() {
    dispatch({ type: actions.CLEAR_TASK });
  }

  function clearOldTask() {
    dispatch({ type: actions.CLEAR_OLD_TASK });
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
        addTaskToContext,
        updateTaskFromContext,
        removeTaskFromContext,
        clearTask,
        clearOldTask,
        updateTaskTitle,
        updateTaskList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
