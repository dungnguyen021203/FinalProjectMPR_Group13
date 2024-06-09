class Folders {
    constructor(id, name, updateAt, notes = []) {
        this.id = id;
        this.name = name;
        this.notes = notes;
        this.updateAt = updateAt;
    }
}

export default Folders;