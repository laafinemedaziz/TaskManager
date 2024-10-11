export function createBtn(btnText,labelText,labId,btnId,className,container,onClickFunction,btnTitle){
    let btnLab = document.createElement("label")
    btnLab.id = labId
    btnLab.innerText = labelText
    let btn = document.createElement("button")
    btn.id = btnId
    btn.className = className
    btn.title = btnTitle
    btn.append(btnText)
    btn.onclick = onClickFunction
    container.append(btnLab)
    container.append(btn)
    return(btn)
}