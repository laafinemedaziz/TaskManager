export function validation(elemField,condition,message){
    if (elemField.Element.value == "") {
        elemField.Valid = false
        elemField.Element.classList.add("invalid")
        elemField.Error.innerText = `Cannot be empty`
    }
    else if (condition){
        elemField.Valid = false
        elemField.Element.classList.add("invalid")
        elemField.Error.innerText = message
    }
    else{
        elemField.Valid = true
        elemField.Element.classList.remove("invalid")
        elemField.Error.innerText = ""
    }
}