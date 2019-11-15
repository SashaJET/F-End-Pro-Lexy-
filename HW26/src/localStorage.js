
export class LocalStorage {
    constructor(){

    }
    saveTasks(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    getTasks(name){
        return JSON.parse(localStorage.getItem(name));
    }
};
