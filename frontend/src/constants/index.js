const baseUrl = "http://localhost:3001/tasks";

const initialState = {
  task: { title: "", isChecked: false, showInput: false },
  oldTask: { title: "", isChecked: false, showInput: false },
  list: [],
};

export { baseUrl, initialState };
