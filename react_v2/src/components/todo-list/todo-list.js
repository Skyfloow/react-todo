import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos }) => {
  
  const elemens = todos.map((item) => {

    const {id, ...itemProps} = item;

    return <li key={id} className='list-group-item'>
            <TodoListItem {...itemProps}/>
          </li>
  });

  return (
    <ul className='list-group todo-list'>
      {elemens}
    </ul>
  );
}

export default TodoList;
