import { editTask, deletetask} from "./taskCard.js"
import { createBtn } from "./createBtn.js"
import { createImg } from "./createImg.js"


export function archivedTask(task){
    //develop the task function
    //task object
    //task div
    const taskDiv = document.createElement("div")
    taskDiv.className = "task"
    let loader = document.getElementById("loader")
    loader.classList.remove("loader")
    //edit task buttons
    let taskEditDiv = document.createElement("div")
    let editbtn = createBtn(createImg("/images/editing.png","icon"),"","","","editbtn",taskEditDiv,()=>{editTask(taskDiv,task)},"Edit task")
    let deletebtn = createBtn(createImg("/images/delete.png","icon"),"","","","editbtn",taskEditDiv,()=>{
        deletetask(task)
    },"Delete task")
    taskDiv.append(taskEditDiv)
    //task elements
    let elements = []
    const taskHeader = document.createElement("div")
    taskHeader.className = "taskHeader"
    const title = document.createElement("p")
    title.innerText = `Task : ${task.data().title}`
    title.className = "taskTitle"
    taskHeader.append(title)
    let status = document.createElement("div")
    status.append(createImg("/images/archivedIcon.png","status"))
    taskHeader.append(status)
    elements.push(taskHeader)
    //adding elements to the task div
    elements.map((elem)=>{
        taskDiv.append(elem)
    })
    return(taskDiv)
}
