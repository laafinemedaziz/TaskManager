export function createImg (path,classP){
    const img = document.createElement("img")
    img.src = path
    img.className = classP
    return(img)
}