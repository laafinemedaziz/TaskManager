import { mainPage } from "./mainPage"
import { createBtn } from "./createBtn"
import { auth, tasksCol } from "./firebase"
import { addDoc } from "../../node_modules/firebase/firestore"
import { formElements } from "./formElements"
import { Task } from "./taskClass"
export function addTaskform(){
    console.log("new task btn clicked")
    const root = document.getElementById("root")
    const mainContainer =  document.createElement("div")
    mainContainer.className = "mainContainer"
    createBtn("Back","","","","back",mainContainer,mainPage)
    //add task form
    const addTaskForm = document.createElement("form")
    addTaskForm.name = "addTaskForm"
    const legend = document.createElement("legend")
    legend.innerText = "New Task :"
    addTaskForm.append(legend)
    let taskTitle = formElements("Task Title","input","text","taskTitle","Enter a title for the new task",addTaskForm)
    //Text area for the task description
    const taskDescription = formElements("Task Description","textarea","","taskdes","Enter a description for your task",addTaskForm)
    //continuing on the addTask form
    const deadline = formElements("Deadline","input","date","deadline","",addTaskForm)
    //submit button
    let subBtn = createBtn("Submit","","","","",addTaskForm,()=>{
        console.log("Button clicked")
    })
    addTaskForm.onsubmit = (event)=>{
        event.preventDefault()
        let date = new Date()
        addTask(new Task(auth.currentUser.uid,taskTitle.Element.value,taskDescription.Element.value,`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,deadline.Element.value),notification,subBtn)
    }
    //adding the notification view
    let notification = document.createElement("div")
    addTaskForm.append(notification)
    //clearing and redering everything to the DOM
    root.innerHTML = ""
    mainContainer.append(addTaskForm)
    root.append(mainContainer)
}
async function addTask(task,notification,subBtn){
    for(let prop in task){
        console.log(`${prop}:${task[prop]}`)
    }
    try {
        notification.classList.remove("error")
        notification.classList.add("loader")
        subBtn.disabled = true
        await addDoc(tasksCol,JSON.parse(JSON.stringify(task)))
        notification.classList.remove("loader")
        notification.classList.add("notification")
        notification.innerText = "Task added successfully"
        setTimeout(() => {
            notification.innerText = "Redirecting to dashboard..."
        }, 1000);
        setTimeout(() => {
            mainPage()
        }, 2000);
    } catch (error) {
        subBtn.disabled = false
        notification.classList.remove("loader")
        notification.classList.add("error")
        console.error(error)
        notification.innerText(error)
    }
}