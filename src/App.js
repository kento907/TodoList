import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from 'react';

function App() {

  // setTodosはtodosの中身を更新したい時に使用
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();
  const todoDateRef = useRef();

  const handleAddTodo = (e) => {
    //タスクを追加する
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    const date = todoDateRef.current.value;
    if(name === "") return
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, date:date, completed:false}];
    });
    todoNameRef.current.value = null;
    todoDateRef.current.value = null;
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id); //条件式に該当するものを選ぶ．（mapは全部取ってくる）
    todo.completed = !todo.completed;
    setTodos (newTodos)
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>ToDoList</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={todoNameRef}/>
      <input type="date" ref={todoDateRef}/>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>

  );
}

export default App;
