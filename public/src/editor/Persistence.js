class Persistence{
    constructor(){
        this.database = []
    }
    update(key, value){
        this.database[key] = value
    }
    insert(key, value){
        this.database.splice(key, 0, value)
    }
    get(key){
        return JSON.parse(localStorage.getItem(key));
    }
    set(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const persistence = new Persistence();
export default persistence;