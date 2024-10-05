import { createBtn } from "./createBtn.js"
import { signupOptions } from "./signupOptions.js"
import { formElements } from "./formElements.js"
import { validation } from "./validation.js"
import { firstPage } from "./firstPage.js"
import { db } from "./firebase.js"
import { addDoc, query, collection, getDocs, where } from '../../node_modules/firebase/firestore'; 


export function signupPage(){
    //implement the code for the sign up page
    //this is responsible for the redering of the signup page
    let root = document.getElementById("root")
    let signUpContainer = document.createElement("div")
    signUpContainer.className = "mainContainer"
    createBtn("Back","","","","back",signUpContainer,signupOptions)
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
                //calling signup function that is responsible for the sign up logic
                //passing the form object, signUpContainer and subBtn
                signUp(form,signUpContainer,subBtn)
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
export async function signUp(form,signUpContainer,subBtn){
    //implement the code for signing up
    //this is responsible for the signup logic
    let notification = document.createElement("div")
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
    const usersCol = collection(db,"users")
    try {
        //verifying if the email is used in another account
        const searchQ = query(usersCol,where("email","==",form.email))
        const verify = await getDocs(searchQ)
        //alerting user to use another email
        if (verify.docs.length != 0){
            console.log(verify.docs[0])
            alert("Email already used.\nTry using another email.")
        }
        //signing up if email doesn't already exist in the db
        else{
            subBtn.disabled = true;
            console.log("Loading...")
            notification.classList.add("loader")
            signUpContainer.append(notification)
            const docRef = await addDoc(usersCol,form)
            console.log(docRef)
            console.log(`User added successfully with ID : ${docRef.id}`)
            notification.classList.remove("loader")
            notification.classList.add("notification")
            notification.innerText = "User sucessfully added!"
            setTimeout(()=>{
                notification.innerText = "Redirecting to main page..."
            },1000)
            setTimeout(()=>{
                firstPage()
            },2000) 
        }
        
    } catch (error) {
        notification.classList.remove("loader")
        subBtn.disabled = false;
        notification.classList.add("error")
        notification.innerText = 'There was an error signing up.\nPlease try again later.'
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