import { createBtn } from "./createBtn.js"
import { signupOptions } from "./signupOptions.js"
import { formElements } from "./formElements.js"
import { validation } from "./validation.js"
import { firstPage } from "./firstPage.js"
import { initializeApp } from '../../node_modules/firebase/app';
import { getFirestore, addDoc, collection } from '../../node_modules/firebase/firestore'; 

export function signupPage(){
    //implement the code for the sign up page
    //this is responsible for the redering of the signup page
    let root = document.getElementById("root")
    let signUpContainer = document.createElement("div")
    signUpContainer.className = "mainContainer"
    createBtn("Back","","","","",signUpContainer,signupOptions)
    let signUpForm = document.createElement("form")
    signUpForm.name = "signUpForm"
    let legend = document.createElement("legend")
    legend.innerText = "Sign up"
    //creating, appending and handeling the form elements
    let elements = []
    signUpForm.append(legend)
    let firstName = formElements("First name: ","input","text","firstName","Enter your First name",signUpForm)
    firstName.Element.onblur = ()=>{
        validation(firstName,(firstName.Element.value.length < 2)||(firstName.Element.value.length > 20),"First name must be between 2 and 20 in length")
    }
    elements.push(firstName)
    let lastName = formElements("Last name: ","input","text","lastName","Enter your Last name",signUpForm)
    lastName.Element.onblur = ()=>{
        validation(lastName,(lastName.Element.value.length < 2)||(lastName.Element.value.length > 20),"Last name must be between 2 and 20 in length")
    }
    elements.push(lastName)
    let email = formElements("Email: ","input","text","email","Enter your Email",signUpForm)
    email.Element.onblur = ()=>{
        validation(email,!validEmail(email.Element.value),"Enter a valid Email")
    }
    elements.push(email)
    let password = formElements("Password: ","input","password","password","Enter a Password",signUpForm)
    password.Element.onblur = ()=>{
        validation(password,password.Element.value.length <= 8,"Password must be at least 8 in length")
    }
    elements.push(password)
    let cPassword = formElements("Confirm password: ","input","password","cPassword","Confirm Password",signUpForm)
    cPassword.Element.onblur = ()=>{
        validation(cPassword,cPassword.Element.value != password.Element.value,"Not matching password")
    }
    elements.push(cPassword)
    //submit button
    let subBtn = document.createElement("button")
    subBtn.type = "submit"
    subBtn.innerText = "Submit"
    signUpForm.append(subBtn)
    signUpForm.onsubmit = (event)=>{
        event.preventDefault()
        let form = {
            firstName : firstName.Element.value,
            lastName : lastName.Element.value,
            email : email.Element.value,
            password : password.Element.value
        }
        if (validateForm(elements)){
            let validate = confirm(`Confirm information ? \n
                First Name: ${form.firstName} \n
                Last Name: ${form.lastName} \n
                Email: ${form.email}
                `)
            if (validate){
                signUp(form)
            }
        }
        else{
            alert("Please verify your information")
        }
    }
    //clearing the root and appending the form to it
    root.innerHTML = ""
    signUpContainer.append(signUpForm)
    root.append(signUpContainer)
}
export async function signUp(form){
    //implement the code for signing up
    //this is responsible for the signup logic
    let loader = document.getElementById("loader")
    //Using mockApi for testing
    /* let usersEndPoint = "https://66ffdeec4da5bd2375524cbe.mockapi.io/Users"
    try {
        let response = await fetch(usersEndPoint,{
            method : "POST",
            headers :{
                "Content-Type": "application/json",
            },
            body : JSON.stringify(form)
        })
        if (response.ok){
            if(response.status === 201){
                console.log("User created successfully")
                alert(`User ${form.firstName} ${form.lastName} was successfully created !`)
                firstPage()
            }
            else{
                throw new Error(`Error : ${response.status} : ${response.statusText}`)
            }
        }
    } catch (error) {
        alert("There was an error sending your request.\nPlease try again later.")
        console.error(error)
    } */
   //Fire base
    const firebaseConfig = {
        apiKey: "AIzaSyDMDzajfBrAa66F9reZipV3e7oIWPCO2PQ",
        authDomain: "task-manager-2630c.firebaseapp.com",
        projectId: "task-manager-2630c",
        storageBucket: "task-manager-2630c.appspot.com",
        messagingSenderId: "989011003579",
        appId: "1:989011003579:web:7a3bf431ba235a1253019e",
        measurementId: "G-V0CTCGEH9P"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const usersDB = collection(db,"users")
    try {
        console.log("Loading...")
        loader.classList.add("loader")
        const docRef = await addDoc(usersDB,form)
        console.log(docRef)
        console.log(`User added successfully with ID : ${docRef.id}`)
        loader.classList.remove("loader")
        alert(`User added successfully !`)
        firstPage()
    } catch (error) {
        console.error(`There was a problem adding user to the DB : ${error}`)
    }
}
    
function validEmail(email){
    let valid = false
    let validDomains = ["gmail","hotmail","outlook","yahoo"]
    if(email.includes('@')){
        let indexalt = email.indexOf('@')
        let indexdot = email.lastIndexOf('.')
        if(email.substring(indexalt+1).includes('.')){
            if(validDomains.includes(email.substring(indexalt+1,indexdot))){
                valid = true
            }
        }
    }
    return valid
}
function validateForm (form){
    for (let element of form){
        if(!element.Valid){
            return(false)
        }
    }
    return true
}