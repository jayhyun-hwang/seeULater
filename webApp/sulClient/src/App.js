import React, { useState, useEffect } from "react";
import './App.css';
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from "./components/useToken";

const define = require("./define/define");

function App() {
  
  const {token, setToken} = useToken();
  
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path = "/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;