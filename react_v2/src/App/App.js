import React, {Component} from 'react';
import './App.css';
import AppHeader from '../components/app-header';
import SearchPanel from'../components/search-panel';
import TodoList from '../components/todo-list';
import ItemStatusFilter from '../components/item-status-filter';

export default class App extends Component {

  state = {
    todoData: [
      {label: 'Drink Coffee', important: false, id: 'dc'},
      {label: 'Make awesome app', important: true, id: 'map'},
      {label: 'Have a lucnh', important: false, id: 'hal'}
    ]
  };

  deletItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  render(){

    return (
      <div className="App">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData}
                  onDeleted={this.deletItem} />
      </div>
    );
  };
}


