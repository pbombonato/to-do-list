import { createContext, useReducer } from "react";
import { globalState } from "./data";
import { reducer } from "./reducer";

export const Context = createContext()

export const TaskContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState)

  return (
    <Context.Provider value={{ state }}>
      {children}
    </Context.Provider>
  )
}
