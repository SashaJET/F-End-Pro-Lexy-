import $ from 'jquery';
import './style.css';
import { LocalStorage } from './localStorage';

$(function (){  

    const $todoList = $('#todoList');
    const $newTodoForm = $('#newTodoList');
    const todoItemTemplate = $('#todoItemTemplate').html();
    const DONE_CLASS = 'done';
    const storageData = new LocalStorage();

class ToDoList{   
    constructor(){        
        // this.todoListItems = JSON.parse(localStorage.getItem('todos'));
        this.todoListItems = storageData.getTasks() || [];                
        this.bindEventListeners();
        this.init();     
    } 

    init(){  this.renderTodoList(); }

    // this.$el.on('click', this.clickHandler.bind(this));
    bindEventListeners(){
        $todoList.on('click', '.delete-btn', this.onDeleteBtnClick.bind(this));
        $todoList.on('click', '.todo-item', this.onTodoItemClick.bind(this));
        $newTodoForm.on('submit', this.onNewTodoFromSubmit.bind(this));
    }

    onDeleteBtnClick(e){
        const $todoItem = $(e.target).parent();
        this.deleteTodoItem($todoItem.data('todoIndex'));
    }
    onTodoItemClick(e){
        this.toggleTodoItem($(e.target).parent().data('todoIndex'));
    }
    onNewTodoFromSubmit(e){
        e.preventDefault();
        this.submitNewItem();
        storageData.saveTasks('todos', this.todoListItems);
        e.target.reset();
   }

    renderTodoList() {
        const todoListItemsHtml = this.todoListItems.map(el => ToDoList.getTodoItemsHtml(el));
            $todoList.html(todoListItemsHtml.join('\n'));
    }

    submitNewItem(){
        const newTodoItem = {
            id: Date.now(),
            isDone: false
        };
        $newTodoForm.serislizeArray().forEach(({name, value}) => {
            newTodoItem[name] = value;
        });
        this.todoListItems.push(newTodoItem);
        $todoList.append(ToDoList.getTodoItemHtml(newTodoItem));
        
    }

    getTodoItemHtml({id, title, isDone}) {
        return todoItemTemplate
                .replace('{{id}}', id)
                .replace('{{title}}', title)
                .replace('{{isDone-class}}', isDone ? DONE_CLASS : '');
    
    
    }

    getTodoElById(id){
        return $(`[data-todo-index="${id}]`);
    }

    deleteTodoItem(idToDelete){
        this.todoListItem = todoListItem.filter(({id}) => id != idToDelete);
        storageData.saveTasks('todos', this.todoListItems);
        ToDoList.getTodoElById(idToDelete).remove();
    }
    
    toggleTodoItem(idToToggle){
        const todoItem= this.todoListItems.find(({id}) => id == idToToggle);
        todoItem.isDone = !todoItem.isDone;
        ToDoList.toggleTodoElState(todoItem);
        storageData.saveTasks('todos', this.todoListItems);;
    }

    toggleTodoElState({id, isDone}) {
        const $todoItem = ToDoList.getTodoElById(id);
        $todoItem.removeClass(DONE_CLASS);
        if(isDone){
            $todoItem.addClass(DONE_CLASS);
        }
    }

    saveTasks() {
        localStorage.setItem('todos', JSON.stringify(this.todoListItems));

    }
}

const todo = new ToDoList();

})