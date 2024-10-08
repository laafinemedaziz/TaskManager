import { firstPage } from "./firstPage"
import { createBtn } from "./createBtn"
import { formElements } from "./formElements"
import { auth } from "./firebase"
import { signInWithEmailAndPassword,signOut } from "../../node_modules/firebase/auth"

export function loginPage(){
    //implement the code for the logging in 
    //this is responsible for the redering of the login page
    const root = document.getElementById("root")
    const logInContainer = document.createElement("div")
    logInContainer.className = "mainContainer"
    createBtn("Back","","","","back",logInContainer,firstPage)
    let logInForm = document.createElement("form")
    logInForm.name = "logInForm"
    let legend = document.createElement("legend")
    legend.innerText = "Log in"
    logInForm.append(legend)
    console.log("Sign in clicked!")
    const email = formElements("Email","input","email","email","Enter you Email",logInForm)
    const password = formElements("Password","input","password","password","Enter you password",logInForm)
    //submit button
    let subBtn = document.createElement("button")
    subBtn.type = "submit"
    subBtn.innerText = "Submit"
    //adding the notification view
    let notification = document.createElement("div")
    logInForm.append(notification)
    logInForm.onsubmit = (event)=>{
        event.preventDefault();
        logIn({
            Email:email.Element.value,
            Password:password.Element.value
        },subBtn,notification)
    }
    //appending everything to the DOM
    logInForm.append(subBtn)
    logInContainer.append(logInForm)
    root.innerHTML = ""
    root.append(logInContainer)

}
export async function logIn(form,subBtn,notification){
    //implement the code for logging in
    //this is responsible for the login logic
    try {
        if(auth.currentUser == null){
            subBtn.disabled = true
            const userCred = await signInWithEmailAndPassword(auth,form.Email,form.Password)
            console.log(auth.currentUser)
        }
    } catch (error) {
        subBtn.disabled = false
        console.error(error)
        notification.innerText = `There was an error logging in`
    }
}