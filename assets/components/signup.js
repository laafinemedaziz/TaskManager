import { createBtn } from "./createBtn.js"
import { signupOptions } from "./signupOptions.js"
import { formElements } from "./formElements.js"
import { validation } from "./validation.js"
import { auth } from "./firebase.js"
import { createUserWithEmailAndPassword, updateProfile } from "../../node_modules/firebase/auth"


export function signupPage(){
    //implement the code for the sign up page
    //this is responsible for the redering of the signup page
    let root = document.getElementById("root")
    let signUpContainer = document.createElement("div")
    signUpContainer.className = "mainContainer"
    createBtn("Back","","","","back",signUpContainer,signupOptions,"Back to previous page")
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
    let subBtn = createBtn("Submit","","","","",signUpForm,()=>{
        console.log("Log in clicked")
    },"Submit")
    //adding the notification view
    let notification = document.createElement("div")
    signUpForm.append(notification)
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
                //calling signup function that is responsible for the sign up logic
                //passing the form object, signUpContainer and subBtn
                signUp(form,subBtn,notification)
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

export async function signUp(form,subBtn,notification){
    //implement the code for signing up
    //this is responsible for the signup logic
   //Fire base
    try {
        notification.innerText = ""
        notification.classList.remove("error")
        subBtn.disabled = true
        notification.classList.add("loader")
        const userCred = await createUserWithEmailAndPassword(auth,form.email,form.password)
        notification.classList.remove("loader")
        notification.classList.add("notification")
        notification.innerText= "User successfully signed up!\nSetting up your profile..."
        await updateProfile(userCred.user,{
            displayName:`${form.firstName} ${form.lastName}`
        })
        setTimeout(()=>{
            notification.innerText= "Everything is set! \nYou are now logged in!"
        },1000)
        console.log("User signed in")
        //Gonna implement the code of the redirectig after I implement the fyp code
        
    } catch (error) {
        notification.classList.remove("loader")
        subBtn.disabled = false;
        notification.classList.add("error")
        console.error(`There was a problem signing up : ${error.code} : ${error.message}`);
        notification.innerText = `There was an error signing up: ${error.message}.\n`
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