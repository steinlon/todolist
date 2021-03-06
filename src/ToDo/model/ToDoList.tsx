import {action, computed, observable} from "mobx";
import ToDoModel from "./ToDoModel";

export default class ToDoList {

    id!:number;
    name!:string;
    @observable
    toDos:ToDoModel[] = [];
    position?:DOMRect;

    @action.bound
    init(listId:number, name:string, todos:ToDoModel[]) {
        this.id = listId;
        this.name = name;
        this.toDos = todos;
    }

    @action.bound
    getToDos() {
        return this.toDos;
    }

    @action.bound
    addToDo(id, title, isCompleted) {
        const createdToDo:ToDoModel = {
            id: id,
            listId: this.id,
            title: title,
            isCompleted: isCompleted
        };
        this.addNewToDoToList(createdToDo);
    }

    @action.bound
    removeToDo(todoId:number) {
        this.toDos = this.toDos.filter(it => it.id !== todoId);
    }

    @action.bound
    addNewToDoToList(todo:ToDoModel) {
        this.toDos.push(todo);
    }

    @action.bound
    toggleTodoStatus(todoId:number) {
        const toggleToDo = this.toDos.find(it => it.id === todoId);
        if (toggleToDo) {
            toggleToDo.isCompleted = !toggleToDo.isCompleted;
        }
    }

    @action.bound
    toggleAllTodoStatus(status:boolean) {
        this.toDos.forEach(it => it.isCompleted = status);
    }

    @computed get total() {
        return this.toDos.length;
    }

    @computed get completedTotal() {
        return this.toDos.filter(it => it.isCompleted).length;
    }
}