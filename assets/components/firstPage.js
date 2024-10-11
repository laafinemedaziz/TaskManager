import { createBtn } from "./createBtn.js"
import { loginPage } from "./login.js"
import { signupOptions } from "./signupOptions.js"

export function firstPage(){
    let root = document.getElementById("root")
    root.innerHTML = ""
    let firstpageContainer = document.createElement("div")
    firstpageContainer.className = "mainContainer"
    //table to contain the dom element
    let domElements = []
    //the DOM
    let greeting = document.createElement("h1")
    greeting.innerText = "Hello and welcome to your very best task manager app where you can manage all of your tasks in one place !"
    domElements.push(greeting)
    //creating the logIn button
    let logInDiv = document.createElement("div")
    logInDiv.className = "btnContainer"
    createBtn("Log In","You already have an account ? ","loginLabId","loginId","btn",logInDiv,loginPage,"Sign in")
    domElements.push(logInDiv)
    //creating the signUp button
    let signUpDiv = document.createElement("div")
    signUpDiv.className = "btnContainer"
    createBtn("Sign Up","OR You can create an account now : ","signupLabId","signupId","btn",signUpDiv,signupOptions,"Sign up")
    domElements.push(signUpDiv)
    //appending everything to the DOM
    domElements.map(element =>firstpageContainer.append(element))
    root.append(firstpageContainer)

}