// import { actions } from "./actions";
import { initialState } from "./data";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, list: [action.payload, ...state.list] };

    case "UPDATE_TASK":
      return {
        ...state,
        list: state.list.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "REMOVE_TASK":
      return {
        ...state,
        list: state.list.filter((task) => task.id !== action.payload.id),
      };



    case "CLEAR_TASK": {
      return { ...state, task: initialState.task };
    }
    case "CLEAR_OLD_TASK": {
      return { ...state, oldTask: initialState.oldTask };
    }
    case "UPDATE_NEW_TASK_TITLE": {
      return { ...state, task: { ...state.task, title: action.payload } };
    }
    case "UPDATE_TASK_TITLE": {
      return { ...state, oldTask: { ...state.oldTask, title: action.payload } };
    }
    case "UPDATE_TASK_LIST": {
      return { ...state, list: action.payload }
    }
    default:
      return state;
  }
};
