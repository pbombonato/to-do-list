import Checkbox from "../Checkbox";
import TaskTitle from "../TaskTitle";
import TrashButton from "../TrashButton";

function TaskRow({ task }) {
  return (
    <div className="div-row">
      <Checkbox task={task} />
      <TaskTitle task={task} />
      <TrashButton task={task} />
    </div>
  );
}

export default TaskRow;
