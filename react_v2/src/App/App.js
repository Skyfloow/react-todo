import React, {Component} from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    ],
    term: '',
    filter: ''
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
    
    if(text.length) {
      this.setState(({ todoData }) => {
        const newArr = [
          ...todoData,
          newItem
        ];

        return {
          todoData: newArr
        };
      });
    } else {
      toast.warn("Need to enter to-do");
      return
    }
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

  search(items, term) {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };
  
  render(){

    const { todoData, term, filter } = this.state,
          visibleItems = this.filter(this.search(todoData, term), filter),
          doneCount = todoData.filter((el) => el.done).length,
          todoCount = todoData.length - doneCount;

    return (
      <div className="App">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} 
          onFilterChange={this.onFilterChange} />
        </div>

        <TodoList todos={visibleItems}
                  onDeleted={this.deletItem} 
                  onToggleDone={this.onToggleDone}
                  onToggleImportant={this.onToggleImportant}
                  />
        <ItemAddForm onItemAdded={this.addItem}/>
        <ToastContainer />
      </div>
    );
  };
}


