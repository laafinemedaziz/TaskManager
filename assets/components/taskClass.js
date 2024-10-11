export class Task{
    constructor(UID,title,description,created,deadline){
        this.UID = UID
        this.title = title
        this.description = description
        this.created = created
        this.deadline = deadline
        this.status = "pending"
    }
}