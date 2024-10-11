import { formElements } from "./formElements"
import { createBtn } from "./createBtn"
import { db,tasksCol } from "./firebase"
import { updateDoc,deleteDoc } from "../../node_modules/firebase/firestore"
import { doc } from "../../node_modules/firebase/firestore"
import { mainPage } from "./mainPage"
import { createImg } from "./createImg"
export function taskCard(task){
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
    let donebtn = createBtn(createImg("/images/done.png","icon"),"","","","editbtn",taskEditDiv,()=>{
        makeTaskDone(task)
    },"Mark as done")
    let archivedbtn = createBtn(createImg("/images/archive.png","icon"),"","","","editbtn",taskEditDiv,()=>{
        makeTaskArchived(task)
    },"Add to archive")
    taskDiv.append(taskEditDiv)
    //task elements
    let elements = []
    const taskHeader = document.createElement("div")
    taskHeader.className = "taskHeader"
    const title = document.createElement("p")
    title.innerText = `Task : ${task.data().title}`
    title.className = "taskTitle"
    taskHeader.append(title)
    let status = document.createElement("p")
    status.innerText = task.data().status
    status.className = "status"
    taskHeader.append(status)
    elements.push(taskHeader)
    let created = document.createElement("p")
    created.innerText = `Created on : ${task.data().created}`
    elements.push(created)
    let description = document.createElement("p")
    description.innerText = task.data().description
    elements.push(description)
    let deadline = document.createElement("p")
    deadline.className = "deadline"
    deadline.innerText = `Deadline : ${task.data().deadline}`
    elements.push(deadline)
    //adding elements to the task div
    elements.map((elem)=>{
        taskDiv.append(elem)
    })
    return(taskDiv)
}
export function editTask(taskDiv,task){
    //this function will be called when the taskdiv is clicked
    //it will convert the task into a form with editable fields and a confirm button
    //when cnfirm is clicked it will edit the specific doc in the firestore along with rendering the edited task
    taskDiv.innerHTML = ""
    const editTaskForm = document.createElement("form")
    let editedTitle = formElements("Edit Title","input","text","editedTitle","Edit title",editTaskForm)
    editedTitle.Element.value = task.data().title
    editedTitle.Element.className = "editTaskInput"
    //create the list to edit status
    let editStatusDiv = document.createElement("div")
    editStatusDiv.className = "editStatus"
    let editedStatusLab = document.createElement("label")
    editedStatusLab.name = "editedStatus"
    editedStatusLab.innerText = "Edit status"
    let editedStatus = document.createElement("select")
    editedStatus.name = "editedStatus"
    let status = ["pending","done","archived"]
    status.map((stat)=>{
        let option = document.createElement("option")
        option.innerText = stat
        option.value=stat
        editedStatus.append(option)
    })
    editStatusDiv.append(editedStatusLab)
    editedStatus.value = task.data().status
    editStatusDiv.append(editedStatus)
    editTaskForm.append(editStatusDiv)
    let editedDescription = formElements("Edit description","textarea","","editedDescription","Edit description",editTaskForm)
    editedDescription.Element.innerText = task.data().description
    editedDescription.Element.className = "editTaskInput"
    let editedDeadline = formElements("Edit deadline","input","date","deadline","",editTaskForm)
    editedDeadline.Element.value = task.data().deadline
    editedDeadline.Element.className = "editTaskInput"
    let submitChangesbtn = createBtn("Submit","","","","btn",editTaskForm,()=>{    
        console.log("Submit changed")
    })
    editTaskForm.onsubmit = async (event)=>{
        event.preventDefault()
        await submitChanges({title : editedTitle.Element.value,
            description : editedDescription.Element.value,
            status : editedStatus.value,
            deadline : editedDeadline.Element.value

        },task)
    }
    let cancelbtn = createBtn("Cancel","","","","cancel",editTaskForm,()=>{
        mainPage()
    })
    cancelbtn.type = "button"
    taskDiv.append(editTaskForm)
}
async function submitChanges(editedfields,task){
    try {
        let taskRef = doc(db,"tasks",task.id)
        await updateDoc(taskRef,editedfields)
        mainPage()
    } catch (error) {
        console.error(error)
    }
}
async function deletetask(task){
    try {
        await deleteDoc(doc(db,"tasks",task.id))
        mainPage()
    } catch (error) {
        console.error(error)
    }
}
async function makeTaskDone(task){
    try {
        let taskRef = doc(db,"tasks",task.id)
        await updateDoc(taskRef,{
            status : "done",
        })
        mainPage()
    } catch (error) {
        console.error(error)
    }
}
async function makeTaskArchived(task){
    try {
        let taskRef = doc(db,"tasks",task.id)
        await updateDoc(taskRef,{
            status : "archived",
        })
        mainPage()
    } catch (error) {
        console.error(error)
    }
}