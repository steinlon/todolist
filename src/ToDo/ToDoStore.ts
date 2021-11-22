import {action, computed, configure, observable} from 'mobx';
import ToDoList from "./ToDoList";
import {TODO_LIST_KEY} from "../index";

configure({enforceActions: 'always'});

export default class ToDoStore {

    @observable
    toDosLists:ToDoList[] = [];

    @observable
    selectedToDoList:ToDoList | undefined;

    @action.bound
    init() {
        this.toDosLists = [];
        const tempTodoLists = JSON.parse(localStorage.getItem(TODO_LIST_KEY) as string) || [];
        if (!tempTodoLists.length) {
            this.addNewToDoList();
        } else {
            tempTodoLists.forEach(it => {
                const createdToDoList = new ToDoList();
                createdToDoList.init(it.id, it.name, it.toDos);
                this.appendToDoList(createdToDoList);
            });
        }
    }

    @action.bound
    addNewToDoList() {
        const createdToDoList = new ToDoList();
        createdToDoList.init(this.toDosLists.length + 1, "listName:" + (this.toDosLists.length + 1), []);
        this.appendToDoList(createdToDoList);
    }

    @action.bound
    appendToDoList(toDoList:ToDoList) {
        this.toDosLists.push(toDoList);
    }

    @action.bound
    getToDoLists() {
        return this.toDosLists;
    }

    @action.bound
    addNewToDo(title, isCompleted, listId) {
        const relatedToDoList = this.toDosLists[listId - 1];
        relatedToDoList.addToDo(relatedToDoList.toDos.length + 1, title, isCompleted);
    }

    @action.bound
    removeToDoFromList(todoId:number, listId:number) {
        const relatedToDoList = this.toDosLists[listId - 1];
        relatedToDoList.removeToDo(todoId);
    }

    @action.bound
    setSelectedToDoList(todoList:ToDoList) {
        this.selectedToDoList = todoList;
    }

    @action.bound
    toggleTodoStatus(listId:number, todoId:number) {
        this.toDosLists[listId - 1].toggleTodoStatus(todoId);
    }

    @computed
    get totalToDos() {
        return this.toDosLists.map(it => it.total).reduce((a, b) => a + b, 0);
    }

    @computed
    get totalCompletedToDos() {
        return this.toDosLists.map(it => it.completedTotal).reduce((a, b) => a + b, 0);
    }
}
