// const methodsConfig = {
//     state,
//     setState,
        // getUpdatedList,
        // save
// }
import axios from "axios"
import * as Utils from "../../../utils"
import * as Constants from '../../../constants'

function getUpdatedList(task,config,add = true) {
    const oldList = Utils.cloneArray(config.list)
    const taskElement = oldList.filter(t => t.id === task.id)[0]
    const taskIndex = oldList.indexOf(taskElement)

    
    const list = config.list.filter(t => t.id !== task.id)
    
    console.log(
        task,
        `
        task = ${task},
        config = ${config.list},
        add = ${add},
        oldList = ${oldList},
        taskElement = ${taskElement},
        taskIndex = ${taskIndex},
        list = ${list},
        `
    )
    
    if(add) {
        if (taskElement) {
            oldList[taskIndex] = task
            return oldList
        } else {
            list.unshift(task)
            return list
        }
    } else {
        return list
    }
}

function save(taskFromDataBase, config) {
    const task = taskFromDataBase.showInput 
            ? {...config.state.oldTask} 
            : {...config.state.task}
    
    task.isChecked = taskFromDataBase.isChecked
    
    const method = taskFromDataBase.id ? 'put' : 'post'
    const url = taskFromDataBase.id 
        ? `${Constants.baseUrl}/${taskFromDataBase.id}` 
        : Constants.baseUrl

    axios[method](url, task)
        .then(resp => {
            const list = config.getUpdatedList(resp.data, config)
            taskFromDataBase.showInput 
                ? config.setState({ oldTask: Constants.initialState.oldTask, list})
                : config.setState({ task: Constants.initialState.task, list })
    })
}

function saveOnEnter(event, task, config) {
    const enterKeyCode = 13
    if (event.keyCode === enterKeyCode) config.save(task, config)
} 



function toggleCheck(task, config) {
    axios
        .put(Constants.baseUrl + '/' + task.id, {
            title: task.title,
            isChecked: !task.isChecked,
            showInput: task.showInput    
        })
        .then(resp => {
            const list = getUpdatedList(resp.data, config)
            config.setState({ list })
        })
}

function newTitle(event, config) {
    const task = { ...config.state.task }
    
    task.title = event.target.value
    
    config.setState({ task })
}

function updateTitle(event, config) {
    const task = {...config.state.oldTask}
    
    task.title = event.target.value

    config.setState({ oldTask: task })
}

function controlInput(task, showInput=false, config) {
    axios
        .put(Constants.baseUrl + '/' + task.id, {
            title: task.title,
            isChecked: task.isChecked,
            showInput: showInput    
        })
        .then(resp => {
            const list = config.getUpdatedList(resp.data, config)
            config.setState({ list })
        })
}

function removeTask(task, config) {
    axios
        .delete(`${Constants.baseUrl}/${task.id}`)
        .then(() => {
            const list = config.getUpdatedList(task, config,false)
            config.setState({ list })
        })
}

export {
    save,
    getUpdatedList,
    saveOnEnter,
    toggleCheck,
    newTitle,
    updateTitle,
    controlInput,
    removeTask
}