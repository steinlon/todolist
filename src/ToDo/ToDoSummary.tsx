import {inject, observer} from 'mobx-react';
import * as React from 'react';
import ToDoStore from './ToDoStore';
import FinishStatusIcon from "./icons/FinishStatusIcon";
import UnFinishStatusIcon from "./icons/UnFinishStatusIcon";

@inject('toDoStore')
@observer
export default class ToDoSummary extends React.Component<{ toDoStore?:ToDoStore }, {}> {

    render() {
        const totalToDos = this.props.toDoStore?.totalToDos ?? 0;
        const completedToDos = this.props.toDoStore?.totalCompletedToDos ?? 0;
        const toDoLists = this.props.toDoStore?.toDosLists ?? [];

        return (
            <div>
                <section style={{fontSize: 'larger'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                {totalToDos - completedToDos} pending ToDo(s) of {totalToDos} ToDo(s)
                            </div>
                            <div className="col-2">
                                <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.props.toDoStore?.addNewToDoList}>+
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{fontSize: 'larger'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <hr/>
                                <ul className="list-group">
                                    {toDoLists.map((item, index) => {
                                        return (
                                            <li key={index}
                                                className={index % 2 ? 'list-group-item' : 'list-group-item list-group-item-secondary'}>
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <button type="button"
                                                                    className="btn btn-link btn-block"
                                                                    onClick={() => this.props.toDoStore?.setSelectedToDoList(item)}>
                                                                {item.name}&nbsp;&nbsp;
                                                                <span className="badge badge-light">{item.total}</span>
                                                            </button>
                                                        </div>
                                                        {item.total === item.completedTotal &&
                                                        <div className="col-1"
                                                             style={{margin: "0 -2rem", fontSize: "1.5rem"}}
                                                             onClick={() => item.toggleAllTodoStatus(false)}>
                                                            <span className="badge badge-link">
                                                                <FinishStatusIcon/>
                                                            </span>
                                                        </div>}
                                                        {item.total !== item.completedTotal &&
                                                        <div className="col-1"
                                                             style={{margin: "0 -2rem", fontSize: "1.5rem"}}
                                                             onClick={() => item.toggleAllTodoStatus(true)}>
                                                            <span className="badge badge-link">
                                                                <UnFinishStatusIcon/>
                                                            </span>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}