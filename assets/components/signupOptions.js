import { createBtn } from "./createBtn.js";
import { firstPage } from "./firstPage.js";
import { signupPage } from "./signup.js";
export function signupOptions(){
    //choose how to sign up
    let root = document.getElementById("root")
    let options = document.createElement("div")
    options.className = "mainContainer"
    createBtn("Back","","","","back",options,firstPage,"Back to previous page")
    createBtn("Sign Up with Google ( under developement )","","","signupGoogle","signupGoogle",options,()=>{},"Not available yet")
    createBtn("Create an account","","","createAccbtn","createAccbtn",options,signupPage,"Sign up")
    root.innerHTML = ""
    root.append(options)
}