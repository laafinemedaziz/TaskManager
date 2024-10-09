export function task(titleP,createdP,statusP,descriptionP,deadlineP){
    //develop the task function
    //task div
    const task = document.createElement("div")
    task.className = "task"
    task.onclick = ()=> {editTask(task)}
    //task elements
    let elements = []
    const taskHeader = document.createElement("div")
    taskHeader.className = "taskHeader"
    const title = document.createElement("p")
    title.innerText = titleP
    taskHeader.append(title)
    let status = document.createElement("p")
    status.innerText = statusP
    taskHeader.append(status)
    elements.push(taskHeader)
    let created = document.createElement("p")
    created.innerText = `Created on : ${createdP}`
    elements.push(created)
    let description = document.createElement("p")
    description.innerText = descriptionP
    elements.push(description)
    let deadline = document.createElement("p")
    deadline.className = "deadline"
    deadline.innerText = `Deadline : ${deadlineP}`
    elements.push(deadline)
    //adding elements to the task div
    elements.map((elem)=>{
        task.append(elem)
    })
    return(task)
}
export function editTask(task){
    //this function will be called when the taskdiv is clicked
    //it will convert the task into a form with editable fields and a confirm button
    //when cnfirm is clicked it will edit the specific doc in the firestore along with rendering the edited task
    console.log("clicked")
}