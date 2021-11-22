import * as React from "react";
import FinishStatusIcon from "./icons/FinishStatusIcon";
import UnFinishStatusIcon from "./icons/UnFinishStatusIcon";
import ToDoList from "./model/ToDoList";
import {MOVED_TODO_ITEM_KEY} from "../index";
import ToDoStore from "./ToDoStore";

class ToDoListItemView extends React.Component<{ item:ToDoList, index:number, toggleAllTodoStatus:Function, toDoStore?:ToDoStore }, {}> {

    handleItemDragOver = (e) => {
        e.preventDefault();
    }

    handleItemDrop = (e) => {
        const movedToDo = JSON.parse(e.dataTransfer.getData(MOVED_TODO_ITEM_KEY));
        this.props.toDoStore?.removeToDoFromList(movedToDo.id, movedToDo.listId);
        this.props.toDoStore?.addNewToDo(movedToDo.title, movedToDo.isCompleted, this.props.item.id);
        this.props.toDoStore?.setSelectedToDoList(this.props.item);
    }

    render() {
        const {item, index, toggleAllTodoStatus} = this.props;

        return (
            <li ref={el => {
                if (!el) return;
                item.position = el.getBoundingClientRect();
            }}
                onDrop={this.handleItemDrop}
                onDragOver={this.handleItemDragOver}
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
                             onClick={() => toggleAllTodoStatus(false)}>
                            <span className="badge badge-link">
                                <FinishStatusIcon/>
                            </span>
                        </div>}
                        {item.total !== item.completedTotal &&
                        <div className="col-1"
                             style={{margin: "0 -2rem", fontSize: "1.5rem"}}
                             onClick={() => toggleAllTodoStatus(true)}>
                            <span className="badge badge-link">
                                <UnFinishStatusIcon/>
                            </span>
                        </div>}
                    </div>
                </div>
            </li>
        )
    }
}

export default ToDoListItemView;