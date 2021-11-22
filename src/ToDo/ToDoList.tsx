import {action, computed, observable} from "mobx";
import ToDoModel from "./ToDoModel";

export default class ToDoList {

    id!:number;
    name!:string;
    @observable
    toDos:ToDoModel[] = [];

    @action.bound
    init(listId:number, name:string) {
        this.id = listId;
        this.name = name;
        this.toDos = [];
    }

    @action.bound
    getToDos() {
        return this.toDos;
    }

    @action.bound
    addToDo(title, isCompleted) {
        const createdToDo:ToDoModel = {
            id: this.toDos.length + 1,
            listId: this.id,
            title: title,
            isCompleted: isCompleted
        };
        this.addNewToDoToList(createdToDo);
    }

    @action.bound
    addNewToDoToList(todo:ToDoModel) {
        this.toDos.push(todo);
    }

    @computed get total() {
        return this.toDos.length;
    }

    @computed get completedTotal() {
        return this.toDos.filter(it => it.isCompleted).length;
    }
}