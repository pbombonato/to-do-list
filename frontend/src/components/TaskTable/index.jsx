import "./TaskTable.css";

import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Main from "../../templates/Main";
import TaskTitle from "../TaskTitle";
import Checkbox from "../Checkbox";
import TrashButton from "../TrashButton";

import * as Constants from "../../constants";
import { TaskContext } from "../../context/taskContext";

export default class TaskTable extends Component {
  state = { ...Constants.initialState };

  addTask(task) {
    const oldList = JSON.parse(JSON.stringify(this.state.list));
    const taskExists = oldList.some((t) => t.id === task.id);

    if (taskExists) {
      this.setState({ list: oldList });
    } else {
      const list = [task, ...oldList];
      this.setState({ list });
    }
  }

  updateTask(task) {
    const oldList = JSON.parse(JSON.stringify(this.state.list));
    const taskElement = oldList.find((t) => t.id === task.id);

    if (!taskElement) {
      this.setState({ list: oldList });
    } else {
      const list = oldList.map((t) => (t.id === task.id ? task : t));
      this.setState({ list });
    }
  }

  removeTask(task) {
    const oldList = JSON.parse(JSON.stringify(this.state.list));
    const list = oldList.filter((t) => t.id !== task.id);
    this.setState({ list });
  }

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
      if (taskDB.showInput) {
        this.updateTask(resp.data);
        this.setState({ oldTask: Constants.initialState.oldTask });
      } else {
        this.addTask(resp.data);
        this.setState({ task: Constants.initialState.task });
      }
    });
  }

  toggleCheck(task) {
    axios
      .put(Constants.baseUrl + "/" + task.id, {
        title: task.title,
        isChecked: !task.isChecked,
      })
      .then((resp) => {
        this.updateTask(resp.data);
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
        this.setState({ list: oldList }); //
      } else {
        list.unshift(task);
        this.setState({ list }); //
      }
    } else {
      this.setState({ list }); //
    }
  }

  newTitle(event) {
    const task = { ...this.state.task };

    task.title = event.target.value;

    this.setState({ task }); //
  }

  updateTitle(event) {
    const task = { ...this.state.oldTask };

    task.title = event.target.value;

    this.setState({ oldTask: task }); //
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
        this.updateTask(resp.data);
      });
  }

  remove(task) {
    axios.delete(`${Constants.baseUrl}/${task.id}`).then((resp) => {
      this.removeTask(task);
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
    );
  }
}
