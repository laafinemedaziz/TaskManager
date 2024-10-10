import { firstPage } from "./firstPage"
import { createBtn } from "./createBtn"
import { auth } from "./firebase"
import { task } from "./task"
import { field } from "./field"
export function mainPage(){
    const root = document.getElementById("root")
    const dashboard = document.createElement("div")
    dashboard.className = "dashboard"
    //header to display user infos, Tasks count and signout button
    const header = document.createElement("div")
    header.className = "header"
    const userInofs = document.createElement("div")
    userInofs.className = userInofs
    userInofs.innerText = `Welcome ${auth.currentUser.displayName}`
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

    pending.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    pending.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    pending.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    done.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    done.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    archived.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))
    archived.append(task("Task title","mm/dd/yyyy","Status","Task description Task description Task description","mm/dd/yyyy"))

    root.innerHTML = ""
    root.append(header)
    
    root.append(dashboard)
}
async function getTasks(){

}