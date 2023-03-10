import styles from "./TrashButton.module.css";

import { useContext } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TrashButton({ task }) {
  const { removeTaskFromContext } = useContext(Context);

  function removeTaskFromDB(task) {
    axios.delete(`${baseUrl}/${task.id}`).then(() => {
      removeTaskFromContext(task);
    });
  }

  return (
    <div className={styles["div-btns"]}>
      <button
        aria-label="Delete task"
        className="btn"
        onClick={() => removeTaskFromDB(task)}
      >
        <FontAwesomeIcon icon={faTrash} style={{ color: 'var(--icons-color)'}} />
      </button>
    </div>
  );
}

export default TrashButton;
