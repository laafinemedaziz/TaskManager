export function field (taskStatus){
    const field = document.createElement("div")
    field.className = "field"
    field.classList.add(taskStatus)
    const header = document.createElement("div")
    header.className = `${taskStatus}Header`
    header.append(`${taskStatus}:`)
    field.append(header)
    return(field)
}