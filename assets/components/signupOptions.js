import { createBtn } from "./createBtn.js";
import { firstPage } from "./firstPage.js";
import { signupPage } from "./signup.js";
export function signupOptions(){
    //choose how to sign up
    let root = document.getElementById("root")
    let options = document.createElement("div")
    options.className = "mainContainer"
    createBtn("Back","","","","back",options,firstPage)
    createBtn("Sign Up with Google","","","signupGoogle","signupGoogle",options)
    createBtn("Create an account","","","createAccbtn","createAccbtn",options,signupPage)
    root.innerHTML = ""
    root.append(options)
}