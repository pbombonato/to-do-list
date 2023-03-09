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

    case "UPDATE_TASK_LIST": {
      return { ...state, list: action.payload };
    }
    default:
      return state;
  }
};
