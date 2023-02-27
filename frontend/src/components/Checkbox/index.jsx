import React from "react";

function Checkbox(props) {
  return (
    <div className="div-checkbox">
      <input
        type="checkbox"
        name={props.task.id}
        id={`checkbox-${props.task.id}`}
        defaultChecked={props.task.isChecked}
        onChange={props.handleChange}
      />
      <label htmlFor={`checkbox-${props.task.id}`} className="checkmark" />
    </div>
  );
}

export default Checkbox;
