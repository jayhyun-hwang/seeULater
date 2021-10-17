import React, { useState, useEffect } from "react";
import './App.css';
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const define = require("./define/define");

function setToken(userToken){
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  //토큰 있다면 반환
  return userToken?.token
}

function App() {
  
  const token = getToken();
  // const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path = "/Main">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;