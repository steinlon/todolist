import {inject, observer} from 'mobx-react';
import * as React from 'react';
import ToDoTableView from './ToDoTableView';
import ToDoStore from './ToDoStore';
import ToDoList from "./model/ToDoList";

@inject('toDoStore')
@observer
export default class ToDoComponent extends React.Component<{ toDoStore?:ToDoStore, selectedToDoList:ToDoList },
    { title:string; isCompleted:boolean; }> {

    constructor(props) {
        super(props);
        this.state = {title: '', isCompleted: false};

        this.addToDo = this.addToDo.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCompleteChange = this.onCompleteChange.bind(this);
        this.toggleTodoStatus = this.toggleTodoStatus.bind(this);
    }

    addToDo(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.props.toDoStore?.addNewToDo(
            this.state.title,
            this.state.isCompleted,
            this.props.selectedToDoList?.id || 1
        );

        this.setState({title: '', isCompleted: false});
    }

    onTitleChange(event:React.ChangeEvent<HTMLInputElement>) {
        this.setState({title: event.target.value});
    }

    onCompleteChange(event:React.ChangeEvent<HTMLInputElement>) {
        this.setState({isCompleted: event.target.checked});
    }

    toggleTodoStatus(todoId:number) {
        this.props.toDoStore?.toggleTodoStatus(this.props.selectedToDoList.id, todoId);
    }

    render() {
        const todos = this.props.selectedToDoList.getToDos() || [];

        return (
            <div className="todoContainer">
                <h4>Add New Todo for {this.props.selectedToDoList?.name}</h4>
                <form onSubmit={this.addToDo}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input placeholder="Enter your title"
                                           className="form-control"
                                           onChange={this.onTitleChange}
                                           name="Title"
                                           id="Title"
                                           style={{minWidth: '150px'}}
                                           value={this.state.title}
                                           required/>
                                </div>
                            </div>
                            <div className="col-md-2 ">
                                <div className="form-check">
                                    <input type="checkbox"
                                           className="form-check-input"
                                           id="IsCompleted"
                                           name="IsCompleted"
                                           onChange={this.onCompleteChange}
                                           checked={this.state.isCompleted}/>
                                    <label htmlFor="IsCompleted" className="form-check-label">Completed?</label>
                                </div>
                            </div>
                            <div className="col-md-2 mt-30 ml-20">
                                <button type="submit" className="btn btn-primary">+</button>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="mt-20">
                    <ToDoTableView toDos={todos} toggleTodoStatus={this.toggleTodoStatus}/>
                </div>
            </div>
        );
    }
}
