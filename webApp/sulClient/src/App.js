import React from "react";
import './App.css';
import useToken from "./components/useToken";
import Router from "./components/Router";
import PreRouter from "./components/preRouter";
import CommonHeader from "./components/Header/CommonHeader";

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <PreRouter setToken={setToken}/>
    )
  }

  return (
    <div className="wrapper">
      <CommonHeader/>
      <Router />
      {/* <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main}></Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;