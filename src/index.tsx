import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import ToDoStore from "./ToDo/ToDoStore";
import {autorun} from "mobx";

export const TODO_LIST_KEY = "todoListKey";
export const MOVED_TODO_ITEM_KEY = "movedTodo";
const todoStore = new ToDoStore();

ReactDOM.render(
    <App todoStore={todoStore}/>,
    document.getElementById('root')
);

autorun(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoStore.toDosLists));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
