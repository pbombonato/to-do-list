import { createContext, useCallback, useReducer } from "react";
import { initialTaskList } from "./data";
import { reducer } from "./reducer";
import { actions } from "./actions";

export const Context = createContext();

export const TaskContext = ({ children }) => {
  const [contextTaskList, dispatch] = useReducer(reducer, initialTaskList);

  function addTaskToContext(payload) {
    dispatch({ type: actions.ADD_TASK, payload });
  }

  function updateTaskFromContext(payload) {
    dispatch({ type: actions.UPDATE_TASK, payload });
  }

  function removeTaskFromContext(payload) {
    dispatch({ type: actions.REMOVE_TASK, payload });
  }

  const updateTaskList = useCallback(
    (payload) => {
      dispatch({ type: actions.UPDATE_TASK_LIST, payload });
    },
    [dispatch]
  );

  return (
    <Context.Provider
      value={{
        contextTaskList,
        addTaskToContext,
        updateTaskFromContext,
        removeTaskFromContext,
        updateTaskList,
      }}
    >
      {children}
    </Context.Provider>
  );
};
