export function createBtn(btnText,labelText,labId,btnId,className,container,onClickFunction){
    let btnLab = document.createElement("label")
    btnLab.id = labId
    btnLab.innerText = labelText
    let btn = document.createElement("button")
    btn.id = btnId
    btn.className = className
    btn.innerText = btnText
    btn.onclick = onClickFunction
    container.append(btnLab)
    container.append(btn)
}