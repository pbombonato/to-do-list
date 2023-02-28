import "./TaskTable.css";

import { useContext, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Main from "../../templates/Main";
import TaskTitle from "../TaskTitle";
import Checkbox from "../Checkbox";
import TrashButton from "../TrashButton";

import * as Constants from "../../constants";
import { Context } from "../../context/taskContext";

export default function TaskTable() {
  const {
    state,
    addTask,
    updateTask,
    removeTask,
    clearTask,
    clearOldTask,
    updateNewTaskTitle,
    updateTaskTitle,
    updateTaskList,
  } = useContext(Context);

  useEffect(() => {
    axios(Constants.baseUrl).then((resp) => {
      updateTaskList(resp.data);
    });
  }, [updateTaskList]);

  function createOrUpdateTaskOnDb(task, method) {
    const url = method === "put"
      ? `${Constants.baseUrl}/${task.id}`
      : Constants.baseUrl;

    return axios[method](url, task);
  }

  function save(taskDB) {
    const task = taskDB.showInput ? { ...state.oldTask } : { ...state.task };

    task.isChecked = taskDB.isChecked;

    const method = taskDB.id ? "put" : "post";

    createOrUpdateTaskOnDb(task, method)
      .then((resp) => {
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

  function controlInput(task, showInput = false) {
    axios
      .put(Constants.baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: task.isChecked,
        showInput: showInput,
      })
      .then((resp) => {
        updateTask(resp.data);
      });
  }

  function remove(task) {
    axios.delete(`${Constants.baseUrl}/${task.id}`).then((resp) => {
      removeTask(task);
    });
  }

  function renderRows() {
    return state.list
      .filter((task) => !task.isChecked)
      .map((task) => {
        return (
          <div className="div-row" key={task.id}>
            <Checkbox task={task} />

            <TaskTitle
              value={task.title}
              showInput={task.showInput}
              handleChange={(e) => updateTaskTitle(e.target.value)}
              handleBlur={() => controlInput(task, false)}
              handleDoubleClick={() => controlInput(task, true)}
              handleKeyDown={(e) => saveOnEnter(e, task)}
            />

            <TrashButton handleClick={() => remove(task)} />
          </div>
        );
      });
  }

  function renderCompleteRows() {
    return state.list
      .filter((task) => task.isChecked)
      .map((task) => {
        return (
          <div className="div-row" key={task.id}>
            <Checkbox task={task} />

            <TaskTitle
              value={task.title}
              showInput={task.showInput}
              handleChange={(e) => updateTaskTitle(e.target.value)}
              handleBlur={() => controlInput(task, false)}
              handleDoubleClick={() => controlInput(task, true)}
              handleKeyDown={(e) => saveOnEnter(e, task)}
              complete
            />

            <TrashButton handleClick={() => remove(task)} />
          </div>
        );
      });
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
