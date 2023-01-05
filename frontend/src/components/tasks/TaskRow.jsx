import React from "react"

import Checkbox from "./Checkbox"
import TaskTitle from "./TaskTitle"
import TrashButton from './TrashButton'

function TaskRow(props) {
    return (
        <div className="div-row" key={props.task.id}>
            <Checkbox 
                task={props.task}
                handleChange={() => this.toggleCheck(props.task)}
            />
            
            <TaskTitle 
                value={props.task.title}
                showInput={props.task.showInput}
                handleChange={(e)=>this.updateTitle(e)}
                handleBlur={()=>this.controlInput(props.task,false)}
                handleDoubleClick={() => this.controlInput(props.task, true)}
                handleKeyDown={e=>this.handleKeyDown(e, props.task)}
            />                        
            
            <TrashButton
                handleClick={() => this.remove(props.task)}
            />
        </div>
    )
}

export default TaskRow