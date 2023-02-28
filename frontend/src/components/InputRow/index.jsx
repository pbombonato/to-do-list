import './InputRow.module.css'

import { useContext } from "react";

import { Context } from "../../context/taskContext";

import useTaskFunctions from "../../hooks/useTaskFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InputRow() {
  const { save, saveOnEnter } = useTaskFunctions();
  const { state, updateNewTaskTitle } = useContext(Context);

  return (
    <div className="div-row" id="input-row">
      <div className="div-title">
        <input
          className="input-text"
          type="text"
          name="title"
          value={state.task.title}
          onChange={(e) => updateNewTaskTitle(e.target.value)}
          placeholder="New task"
          onKeyDownCapture={(e) => saveOnEnter(e, state.task)}
          autoFocus
        />
      </div>

      <div className="div-btns">
        <button className="btn" onClick={(e) => save(state.task)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}