class Persistence {
    constructor() {
        this.database = []
    }
    update(key, value) {
        this.database[key] = value
    }
    insert(key, value) {
        this.database.splice(key, 0, value)
    }
    delete(key) {
        if(key==0) return false
        let result = window.confirm('Are you sure you want to delete this node?');
        if (result) this.database.splice(key, 1)
        console.log(result, key, this.database);
        return result
    }
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const persistence = new Persistence();
export default persistence;