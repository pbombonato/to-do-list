import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TrashButton(props) {
  return (
    <div className="div-btns">
      <button className="btn" onClick={props.handleClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default TrashButton;
