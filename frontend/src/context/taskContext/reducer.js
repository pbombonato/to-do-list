import { actions } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      console.log('mudar título');
      return { ...state, title: action.payload };
    }
    default:
      return { ...state };
  }
};
