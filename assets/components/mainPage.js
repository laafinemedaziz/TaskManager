import { createBtn } from "./createBtn"
import { auth } from "./firebase"
import { taskCard } from "./taskCard"
import { field } from "./field"
import { addTaskform } from "./addTask"
import { tasksCol } from "./firebase"
import { getDocs, query, where } from "../../node_modules/firebase/firestore"
export async function mainPage(){
    const root = document.getElementById("root")
    const dashboard = document.createElement("div")
    dashboard.className = "dashboard"
    //header to display user infos, Tasks count and signout button
    const header = document.createElement("div")
    header.className = "header"
    const userInofs = document.createElement("div")
    userInofs.className = "userInofs"
    userInofs.innerText = `Welcome ${auth.currentUser.displayName}  `
    createBtn("Add a new task","","","newTask","newTaskBtn",userInofs,addTaskform)
    header.append(userInofs)
    console.log(auth.currentUser.uid)
    createBtn("Sign out","","","signOut","signOut",header,()=>{
        auth.signOut()
    })
    //Task fields depending on status
    //A task can be pending, done or archived 
    const pending = field("pending")
    dashboard.append(pending)
    const done = field("done")
    dashboard.append(done)
    const archived = field("archived")
    dashboard.append(archived)
    await getTasks(pending,done,archived)
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