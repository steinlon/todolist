import {action, computed, configure, observable} from 'mobx';
import ToDoList from "./ToDoList";

configure({enforceActions: 'always'});

export default class ToDoStore {

    @observable
    toDosLists:ToDoList[] = [];

    @observable
    selectedToDoList:ToDoList | undefined;

    @action.bound
    init() {
        this.toDosLists = [];
        this.addNewToDoList();
    }

    @action.bound
    addNewToDoList() {
        const createdToDoList = new ToDoList();
        createdToDoList.init(this.toDosLists.length + 1, "listName:" + (this.toDosLists.length + 1));
        this.toDosLists.push(createdToDoList);
    }

    @action.bound
    getToDoLists() {
        return this.toDosLists;
    }

    @action.bound
    addNewToDo(title, isCompleted, listId) {
        const relatedToDoList = this.toDosLists[listId - 1];
        relatedToDoList.addToDo(title, isCompleted);
    }

    @action.bound
    setSelectedToDoList(todoList:ToDoList) {
        this.selectedToDoList = todoList;
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
