import "./TaskTable.css";

import { useContext, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Main from "../../templates/Main";

import { baseUrl } from "../../constants";
import { Context } from "../../context/taskContext";
import TaskRow from "../TaskRow";

export default function TaskTable() {
  const {
    state,
    addTask,
    updateTask,
    clearTask,
    clearOldTask,
    updateNewTaskTitle,
    updateTaskList,
  } = useContext(Context);

  useEffect(() => {
    axios(baseUrl).then((resp) => {
      updateTaskList(resp.data);
    });
  }, [updateTaskList]);

  function save(taskDB) {
    const task = taskDB.showInput ? { ...state.oldTask } : { ...state.task };

    task.isChecked = taskDB.isChecked;

    const method = taskDB.id ? "put" : "post";

    const url = taskDB.id
      ? `${baseUrl}/${taskDB.id}`
      : baseUrl;

    axios[method](url, task).then((resp) => {
      if (taskDB.showInput) {
        updateTask(resp.data);
        clearOldTask();
      } else {
        addTask(resp.data);
        clearTask();
      }
    });
  }

  function saveOnEnter(event, task) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) save(task);
  }

  function renderRows() {
    return state.list
      .filter((task) => !task.isChecked)
      .map((task) => <TaskRow task={task} key={task.id} />);
  }

  function renderCompleteRows() {
    return state.list
      .filter((task) => task.isChecked)
      .map((task) => <TaskRow task={task} key={task.id} />);
  }

  function firstRow() {
    return (
      <div className="div-row" id="first-row">
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

  function renderTable() {
    return (
      <div className="div-table">
        {firstRow()}
        {renderRows()}
        {renderCompleteRows()}
      </div>
    );
  }

  return <Main>{renderTable()}</Main>;
}
