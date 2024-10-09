import { firstPage } from "./firstPage"
import { createBtn } from "./createBtn"
import { auth } from "./firebase"
import { task } from "./task"
export function mainPage(){
    const root = document.getElementById("root")
    const mainContainer = document.createElement("div")
    mainContainer.className = "mainContainer"
    mainContainer.append(document.createElement("p").innerText = "Tasks :")
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

    root.innerHTML = ""
    root.append(header)
    mainContainer.append(task("Complete the app","10/9/2024","Pending","Need to complete the task manager project before the end of this month","30/10/2024"))
    mainContainer.append(task("Complete the app","10/9/2024","Pending","Need to complete the task manager project before the end of this month","30/10/2024"))
    root.append(mainContainer)
}
async function getTasks(){

}