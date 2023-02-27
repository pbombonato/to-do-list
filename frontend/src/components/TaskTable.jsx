import "./TaskTable.css";

import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Main from "../templates/Main";
import TaskTitle from "./TaskTitle";
import Checkbox from "./Checkbox";
import TrashButton from "./TrashButton";

import * as Constants from "../constants";
import TaskUtils from "./helpers";
import { TaskContext } from "../context/taskContext";

export default class TaskCrud extends Component {
  state = { ...Constants.initialState };

  UtilsConfig = {
    list: this.state.list,
    state: this.state,
    setState: (obj) => this.setState(obj),
    getUpdatedList: (...params) => TaskUtils.getUpdatedList(...params),
    save: (...params) => TaskUtils.save(...params),
  };

  componentDidMount() {
    axios(Constants.baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  save(taskDB) {
    const task = taskDB.showInput
      ? { ...this.state.oldTask }
      : { ...this.state.task };
    task.isChecked = taskDB.isChecked;

    const method = taskDB.id ? "put" : "post";
    const url = taskDB.id
      ? `${Constants.baseUrl}/${taskDB.id}`
      : Constants.baseUrl;

    axios[method](url, task).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      taskDB.showInput
        ? this.setState({ oldTask: Constants.initialState.oldTask, list })
        : this.setState({ task: Constants.initialState.task, list });
    });
  }

  toggleCheck(task) {
    axios
      .put(Constants.baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: !task.isChecked,
      })
      .then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ list });
      });
  }

  getUpdatedList(task, add = true) {
    const oldList = JSON.parse(JSON.stringify(this.state.list));
    const taskElement = oldList.filter((t) => t.id === task.id)[0];
    const taskIndex = oldList.indexOf(taskElement);

    const list = this.state.list.filter((t) => t.id !== task.id);

    if (add) {
      if (taskElement) {
        oldList[taskIndex] = task;
        return oldList;
      } else {
        list.unshift(task);
        return list;
      }
    } else {
      return list;
    }
  }

  updateList(task, add = true) {
    const list = this.getUpdatedList(task, add);
    this.setState({ list });
  }

  newTitle(event) {
    const task = { ...this.state.task };

    task.title = event.target.value;

    this.setState({ task });
  }

  updateTitle(event) {
    const task = { ...this.state.oldTask };

    task.title = event.target.value;

    this.setState({ oldTask: task });
  }

  saveOnEnter(event, task) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) this.save(task);
  }

  controlInput(task, showInput = false) {
    axios
      .put(Constants.baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: task.isChecked,
        showInput: showInput,
      })
      .then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ list });
      });
  }

  remove(task) {
    axios.delete(`${Constants.baseUrl}/${task.id}`).then((resp) => {
      const list = this.getUpdatedList(task, false);
      this.setState({ list });
    });
  }

  renderRows() {
    return this.state.list
      .filter((task) => !task.isChecked)
      .map((task) => {
        return (
          <div className="div-row" key={task.id}>
            <Checkbox task={task} handleChange={() => this.toggleCheck(task)} />

            <TaskTitle
              value={task.title}
              showInput={task.showInput}
              handleChange={(e) => this.updateTitle(e)}
              handleBlur={() => this.controlInput(task, false)}
              handleDoubleClick={() => this.controlInput(task, true)}
              handleKeyDown={(e) => this.saveOnEnter(e, task)}
            />

            <TrashButton handleClick={() => this.remove(task)} />
          </div>
        );
      });
  }

  renderCompleteRows() {
    return this.state.list
      .filter((task) => task.isChecked)
      .map((task) => {
        return (
          <div className="div-row" key={task.id}>
            <Checkbox task={task} handleChange={() => this.toggleCheck(task)} />

            <TaskTitle
              value={task.title}
              showInput={task.showInput}
              handleChange={(e) => this.updateTitle(e)}
              handleBlur={() => this.controlInput(task, false)}
              handleDoubleClick={() => this.controlInput(task, true)}
              handleKeyDown={(e) => this.saveOnEnter(e, task)}
              complete
            />

            <TrashButton handleClick={() => this.remove(task)} />
          </div>
        );
      });
  }

  firstRow() {
    return (
      <div className="div-row" id="first-row">
        <div className="div-title">
          <input
            className="input-text"
            type="text"
            name="title"
            value={this.state.task.title}
            onChange={(e) => this.newTitle(e)}
            placeholder="New task"
            onKeyDownCapture={(e) => this.saveOnEnter(e, this.state.task)}
            autoFocus
          />
        </div>

        <div className="div-btns">
          <button className="btn" onClick={(e) => this.save(this.state.task)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  }

  renderTable() {
    return (
      <div className="div-table">
        {this.firstRow()}
        {this.renderRows()}
        {this.renderCompleteRows()}
      </div>
    );
  }

  render() {
    return (
    <TaskContext>
      <Main>{this.renderTable()}</Main>
    </TaskContext>
    )
    ;
  }
}
