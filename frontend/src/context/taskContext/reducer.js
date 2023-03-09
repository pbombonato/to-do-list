export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    case "UPDATE_TASK_LIST": {
      return action.payload
    }
    default:
      return state;
  }
};
