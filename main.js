import './style.css'
import { auth } from './assets/components/firebase.js'
import { onAuthStateChanged, signOut } from './node_modules/firebase/auth'
import { firstPage } from "./assets/components/firstPage.js"
import { mainPage } from './assets/components/mainPage.js'
window.onload = function (){
    onAuthStateChanged(auth,(user)=>{  
        if(user === null){
            firstPage()
        }
        else{
            setTimeout(() => {
                mainPage()
            }, 1000);
        }
    })
}
