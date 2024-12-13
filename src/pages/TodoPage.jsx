import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import '../TodoPage.css';

function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; // 'all'
  });

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      
      <button className="nav-button" onClick={() => navigate('/dnd')}>Go to DnD Page</button>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>

      <div className="filter-container">
        <label htmlFor="filter">Filter tasks: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default TodoPage;
