import React from 'react';
import '../TodoItem.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem;
