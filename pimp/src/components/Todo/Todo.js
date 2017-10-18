import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({todo, remove}) => {
  return (
    <div className='box-item'>
      {todo.value}
      <p></p>
      <button className='button-add-new-todo'
        onClick={()=> {
          remove(todo.id)
        }}>
				Task done
      </button>
    </div>
  );
};

export const TodoList = ({todos, remove}) => {
  let allTodos = [];
  if(todos.length > 0) {
    allTodos = todos.map(todo => {
      return (
        <Todo key = {todo.id}
          todo={todo}
          remove={remove}
        />);
    });
  }
  else {
    allTodos.push(<h3 align="center">No more tasks</h3>);
  }

  return (<div> {allTodos} </div>);
};

Todo.propTypes = {
  todo: PropTypes.object,
  remove: PropTypes.func
};

TodoList.propTypes = {
  todos: PropTypes.array,
  remove: PropTypes.func
};

export default Todo;
