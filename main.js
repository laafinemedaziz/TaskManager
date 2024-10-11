import './style.css'
import { auth } from './assets/components/firebase.js'
import { onAuthStateChanged, signOut } from './node_modules/firebase/auth'
import { firstPage } from "./assets/components/firstPage.js"
import { mainPage } from './assets/components/mainPage.js'
window.onload = function (){
    const loader = document.getElementById("loader")
    onAuthStateChanged(auth,(user)=>{  
        if(user === null){
            firstPage()
        }
        else{
            loader.classList.add("loader")
            setTimeout(() => {
                mainPage()
            }, 1000);
        }
    })
}
