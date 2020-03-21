import React, {Component} from 'react';
import './App.css';
import AppHeader from '../components/app-header';
import SearchPanel from'../components/search-panel';
import TodoList from '../components/todo-list';
import ItemStatusFilter from '../components/item-status-filter';
import ItemAddForm from '../components/item-add-form';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lucnh'),
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++ 
    };
  };

  deletItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id),
            newArr = [
              ...todoData.slice(0, idx),
              ...todoData.slice(idx + 1)
            ];

      return {
        todoData: newArr
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id),
            oldItem = arr[idx],
            newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  render(){

    const { todoData } = this.state,
          doneCount = todoData.filter((el) => el.done).length,
          todoCount = todoData.length - doneCount;

    return (
      <div className="App">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={todoData}
                  onDeleted={this.deletItem} 
                  onToggleDone={this.onToggleDone}
                  onToggleImportant={this.onToggleImportant}
                  />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  };
}


