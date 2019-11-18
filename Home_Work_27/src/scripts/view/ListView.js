import $ from 'jquery';

export default class ListView {
    constructor(config){
        this.config = config;
        this.$el = createTodo();
        this.$todoItemTemplate = $('#todoItemTemplate').html();
        this.$el.on('click', '.todo-item', this.onTodoItemClick.bind(this));
        this.$el.on('click', '.delete-btn', this.onDelBtnClick.bind(this));
    }

    onTodoItemClick(e){
        const elemId = this.getElemById($(e.target));
        this.config.onTodoItemClick(elemId);
    }
    onDelBtnClick(){
        const elem = this.getElemById($(e.target).parent())
        this.config.onDeleteBtnClick(elem)
    }
    getElemById($elem){
        return $elem.data('todoId');
    }

    createTodoElem(){
        return $(`<div class="todo-item">
                    <span class="delete-btn">x</span>
                </div>`);
    }

    renderTodosList(data){
        this.$el.html('');
        data.forEach(item = this.renderTodoItem(item));
    }

    renderTodoItem(item){
        this.$el.append(this.getTodoItemHtml(item));
    }

    getTodoItemHtml({id, title, isDone}) {
        return this.$todoItemTemplate.replace('{{id}}', id)
                            .replace('{{title}}', title)
                            .replace('{{isDoneClass}}', isDone ? 'done' : '');
    }
}