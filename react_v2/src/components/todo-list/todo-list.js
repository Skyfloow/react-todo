import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
let elements;

  if(todos.length){

      elements = todos.map((item) => {
      const {id, ...itemProps} = item;

      return <li key={id} className='list-group-item'>
              <TodoListItem {...itemProps}
              onDeleted={() => onDeleted(id)} 
              onToggleImportant={() => onToggleImportant(id)}
              onToggleDone={() => onToggleDone(id)}
              />
            </li>
    });
  } else {
    elements = <p>Sorry, the to-do list is empty.</p>;
  }

  return (
    <ul className='list-group todo-list'>
      {elements}
    </ul>
  );
}

export default TodoList;
