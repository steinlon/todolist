import {observer} from 'mobx-react';
import * as React from 'react';
import ToDoModel from './ToDoModel';
import FinishStatusIcon from "./icons/FinishStatusIcon";
import UnFinishStatusIcon from "./icons/UnFinishStatusIcon";
import {MOVED_TODO_ITEM_KEY} from "../index";

@observer
export default class ToDoTableView extends React.Component<{ toDos:ToDoModel[], toggleTodoStatus:Function }, {}> {

    handleItemDragStart = (e) => {
        const id = Number.parseInt(e.target.id);
        const movedTodo = this.props.toDos.find(it => it.id === id);
        e.dataTransfer.setData(MOVED_TODO_ITEM_KEY, JSON.stringify(movedTodo));
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">listId</th>
                    <th scope="col">status</th>
                </tr>
                </thead>
                <tbody>
                {this.props.toDos.map((todo, index) => {
                    return (
                        <tr key={index}
                            id={todo.id.toFixed(0)}
                            draggable={true}
                            onDragStart={this.handleItemDragStart}>
                            <td scope="row">{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.listId}</td>
                            <td>
                                <div onClick={() => this.props.toggleTodoStatus(todo.id)}>
                                    {todo.isCompleted ? <FinishStatusIcon/> : <UnFinishStatusIcon/>}
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
