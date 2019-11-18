import $ from 'jquery';

import Collection from '../model/Collection';
import ListView from '../view/ListView';

export default class Controller {
    constructor(){
        this.colection = new Collection;
        this.listView = new ListView({
            onItemClick: this.onTodoItemClick.bind(this),
            onDeleteBtnClick: this.onDeleteBtnClick.bind(this)
        });

        $('#todoList').append(this.listView.$el);

        this.collection.fetchData()
            .then( () => this.listView.renderTodosList(this.collection.listTodos));
    }

    onTodoItemClick(id){
        const model = this.getItemById(id);
        model.changeState({done: model.done ? false: true})
            .then(() => this.listView.renderTodosList(this.collection.listTodos));
    }
    onDeleteBtnClick(id){        
        const model = this.getItemById(id);
        // console.log(model);
        model.deleteItem()
            .then(() => this.listView.renderTodosList(this.collection.listTodos));
        // console.log(model.deleteItem());
    
      };

    getItemById(id){
        return this.collection.listTodos.find((item) => item.id == id);
    };
}