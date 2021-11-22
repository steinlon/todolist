import {observer, Provider} from 'mobx-react';
import * as React from 'react';
import './App.css';
import ToDoComponent from './ToDo/ToDoComponent';
import ToDoStore from './ToDo/ToDoStore';
import ToDoSummary from './ToDo/ToDoSummary';

@observer
export default class App extends React.Component<{todoStore:ToDoStore}, {}> {

    componentDidMount() {
        this.props.todoStore.init();
    }

    render() {

        const selectedToDoList = this.props.todoStore.selectedToDoList;

        return (
            <div className="App">
                <h3>ToDo List Demo</h3>
                <Provider toDoStore={this.props.todoStore}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <ToDoSummary/>
                            </div>
                            <div className="col-md-9">
                                {selectedToDoList && <ToDoComponent selectedToDoList={selectedToDoList}/>}
                            </div>
                        </div>
                    </div>
                </Provider>
            </div>
        );
    }
}