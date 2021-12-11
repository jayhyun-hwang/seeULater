import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Login/Register";
import Login from "./Login/Login";

export default function Router({ setToken }) {
    return (
        <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login setToken={setToken} />
          </Route>
          <Route path='/register' exact component={Register}></Route>
        </Switch>
      </BrowserRouter>
    )
}