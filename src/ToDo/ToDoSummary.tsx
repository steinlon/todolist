import {inject, observer} from 'mobx-react';
import * as React from 'react';
import ToDoStore from './ToDoStore';
import ToDoListItemView from "./ToDoListItemView";

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
                                            <ToDoListItemView
                                                key={index}
                                                item={item}
                                                index={index}
                                                toDoStore={this.props.toDoStore}
                                                toggleAllTodoStatus={item.toggleAllTodoStatus}
                                            />
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