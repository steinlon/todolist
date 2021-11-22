import {observer} from 'mobx-react';
import * as React from 'react';
import ToDoModel from './ToDoModel';
import FinishStatusIcon from "./icons/FinishStatusIcon";
import UnFinishStatusIcon from "./icons/UnFinishStatusIcon";

@observer
export default class ToDoTableView extends React.Component<{ toDos:ToDoModel[], toggleTodoStatus:Function }, {}> {

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
                        <tr key={index}>
                            <th scope="row">{todo.id}</th>
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
