import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './Main/Main';
import Register from "./Login/Register";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}></Route>
                <Route path='/register' component={Register}></Route>
            </Switch>
        </BrowserRouter>
    )
}