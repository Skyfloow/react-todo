import React from 'react';
import './App.css';
import AppHeader from '../components/app-header';
import SearchPanel from'../components/search-panel';
import TodoList from '../components/todo-list';
import ItemStatusFilter from '../components/item-status-filter';

const App = () => {
  const todoData = [
    {label: 'Drink Coffee', important: false, id: 'dc'},
    {label: 'Make awesome app', important: true, id: 'map'},
    {label: 'Have a lucnh', important: false, id: 'hal'}
  ];

  return (
    <div className="App">
       <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} />
    </div>
  );
}

export default App;
