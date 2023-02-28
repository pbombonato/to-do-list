import {useContext} from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Context } from "../../context/taskContext";
import { baseUrl } from "../../constants";

function TrashButton({ task }) {
  const { removeTask } = useContext(Context)

  function remove(task) {
    axios.delete(`${baseUrl}/${task.id}`).then((resp) => {
      removeTask(task);
    });
  }

  return (
    <div className="div-btns">
      <button className="btn" onClick={() => remove(task)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default TrashButton;
