import React from "react"

function TaskTitle(props) {
    return (
        <div className="div-title">
            {
                props.showInput 
                    ? (<input type="text" 
                        defaultValue={props.value}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur} 
                        onKeyDownCapture={props.handleKeyDown} />)
                    
                    : (<span onDoubleClick={props.handleDoubleClick}
                        className={props.complete ? 'complete' : ''}>
                        {props.value}</span>)
            }
        </div>
    )
}

export default TaskTitle