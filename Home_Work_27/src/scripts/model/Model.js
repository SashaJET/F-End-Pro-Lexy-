import config from '../config';

export default class Model {
    constructor(data){
        Object.assign(this, data);
    }
}

changeState(data){
    Object.assign(this, data);
    return this.updata();
}

updata(){
    return fetch(config.todosUrl + `/${this.id}`, {
        method: 'PUT',
        data: JSON.stringify(this)
    });
}

deleteItem() {
    Object.assign(this, data);
    return this.deleteFromDB();
}

deleteFromDB() {
    return fetch(config.todosUrl + `/${this.id}`, {
        method: 'DELETE'
    });
}