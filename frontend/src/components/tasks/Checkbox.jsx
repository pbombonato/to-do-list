import React from "react"

// import axios from "axios"
// import { baseUrl } from "../../constants"

function Checkbox(props) {
    // function toggleCheck(task) {
    //     axios
    //         .put(baseUrl + '/' + task.id, {
    //             title: task.title,
    //             isChecked: !task.isChecked,
    //             showInput: task.showInput    
    //         })
    //         .then(resp => {
    //             props.updateList(resp.data)
    //         })
    // }

    return (
        <div className="div-checkbox">
            <input 
                type="checkbox" 
                name={props.task.id}
                id={`checkbox-${props.task.id}`}
                defaultChecked={props.task.isChecked}
                onChange={props.handleChange}
                // onChange={() => toggleCheck(props.task)}
            />
            <label 
                htmlFor={`checkbox-${props.task.id}`} 
                className="checkmark" 
            />
        </div>
    )
}

export default Checkbox