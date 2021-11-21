import { action, configure, observable } from 'mobx';
import ToDoModel from './ToDoModel';

configure({ enforceActions: 'always' });

export default class ToDoStore {
  @observable
  toDos: ToDoModel[] = [];

  private todoAPI = 'https://localhost:44308/api/ToDo';

  @action.bound
  async init() {
    let newToDos: ToDoModel[] = [];
    this.addToDoToStore(newToDos);
  }

  @action.bound
  addToDoToStore(ToDos: ToDoModel[]) {
    this.toDos.length = 0;
    for (let todo of ToDos) {
      this.toDos.push(todo);
    }
  }

  @action.bound
  getToDos() {
    return this.toDos;
  }

  @action.bound
  async addToDo(title, isCompleted) {
    let createdToDo:ToDoModel = {
      id: this.toDos.length,
      title: title,
      isCompleted: isCompleted
    };
    this.addNewToDoToStore(createdToDo);
  }

  @action.bound
  async addNewToDoToStore(todo: ToDoModel) {
    this.toDos.push(todo);
  }
}
