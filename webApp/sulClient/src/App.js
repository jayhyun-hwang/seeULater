import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  

  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  
  //RUN ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  //USE EFFECT
  //핸들러가 실행될 때 마다 실행하는 함수.
  useEffect(() => {
    // console.log('hey');
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>seeULater</h1>
      </header>
      <div className="Body">
        <Form
          inputText={inputText}
          todos={todos}
          setTodos={setTodos}
          setInputText={setInputText}
          setStatus={setStatus}

        />
        <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
        />
      </div>
    </div>
  );
}

export default App;
