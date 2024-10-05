export function formElements(label,element,type,name,placeholder,form){
    let field = document.createElement("div")
    field.className = "inputField"
    let elem = document.createElement(`${element}`)
    let lab = document.createElement("label")
    let error = document.createElement("p")
    error.className = "error"
    lab.innerText = label
    lab.htmlFor = name
    elem.name = name
    elem.id = name
    elem.type = type
    elem.placeholder = placeholder
    field.append(lab)
    field.append(elem) 
    field.append(error)
    form.append(field)
    return({Element : elem,
        Valid : false,
        Error : error
    })
}