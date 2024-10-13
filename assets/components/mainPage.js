import { createBtn } from "./createBtn"
import { auth } from "./firebase"
import { taskCard } from "./taskCard"
import { field } from "./field"
import { addTaskform } from "./addTask"
import { tasksCol } from "./firebase"
import { getDocs, query, where } from "../../node_modules/firebase/firestore"
import { createImg } from "./createImg"
export async function mainPage(){
    const root = document.getElementById("root")
    const loader = document.getElementById("loader")
    loader.classList.remove("loader")
    const dashboard = document.createElement("div")
    dashboard.className = "dashboard"
    //header to display user infos, Tasks count and signout button
    const header = document.createElement("div")
    header.className = "header"
    const userInofs = document.createElement("div")
    userInofs.className = "userInfos"
    userInofs.innerText = `Welcome ${auth.currentUser.displayName}  `
    const newTask = createBtn(createImg("/images/add.png","addIcon"),"","","newTask","newTaskBtn",userInofs,addTaskform,"Add new task")
    newTask.append(" New Task")
    header.append(userInofs)
    console.log(auth.currentUser.uid)
    createBtn("Sign out","","","signOut","signOut",header,()=>{
        auth.signOut()
    },"Sign out")
    //Task fields depending on status
    //A task can be pending, done or archived 
    const pending = field("pending")
    dashboard.append(pending)
    const done = field("done")
    dashboard.append(done)
    const archived = field("archived")
    dashboard.append(archived)
    loader.classList.add("loader")
    await getTasks(pending,done,archived)
    loader.classList.remove("loader")
    root.innerHTML = ""
    root.append(header)
    root.append(dashboard)
}
async function getTasks(pending,done,archived){
    const q = query(tasksCol,where("UID","==",auth.currentUser.uid))
    const docs = await getDocs(q)
    docs.forEach((doc)=>{
        if(doc.data().status === "pending"){
            pending.append(taskCard(doc))
        }else if (doc.data().status ==="done"){
            done.append(taskCard(doc))
        }else{
            archived.append(taskCard(doc))
        }
    })
}