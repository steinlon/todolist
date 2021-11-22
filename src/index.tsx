import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import ToDoStore from "./ToDo/ToDoStore";
import {autorun} from "mobx";

export const TODO_LIST_KEY = "todoListKey";
const todoStore = new ToDoStore();

ReactDOM.render(
  <React.StrictMode>
    <App todoStore={todoStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

autorun(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoStore.toDosLists));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
