import styles from "./TaskTable.module.css";

import { useContext, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../../constants";
import { Context } from "../../context/taskContext";

import Main from "../../templates/Main";
import TaskRow from "../TaskRow";
import InputRow from "../InputRow";

export default function TaskTable() {
  const {
    contextTaskList,
    updateTaskList,
  } = useContext(Context);

  useEffect(() => {
    axios(baseUrl).then((resp) => {
      updateTaskList(resp.data);
    });
  }, [updateTaskList]);

  function renderRows() {
    return contextTaskList
      .filter((task) => !task.isChecked)
      .map((task) => <TaskRow task={task} key={task.id} />);
  }

  function renderCompleteRows() {
    return contextTaskList
      .filter((task) => task.isChecked)
      .map((task) => <TaskRow task={task} key={task.id} />);
  }

  return (
    <Main>
      <div role="list" className={styles["div-table"]}>
        <InputRow />
        {renderRows()}
        {renderCompleteRows()}
      </div>
    </Main>
  );
}
