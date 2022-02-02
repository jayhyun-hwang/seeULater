import React from "react";
import './App.css';
import useToken from "./components/useToken";
import Router from "./components/Router";
import PreRouter from "./components/preRouter";
import PreHeader from "./components/Header/PreHeader";
import CommonHeader from "./components/Header/CommonHeader";

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <PreHeader />
        <PreRouter setToken={setToken} />
      </>
    )
  }

  return (
    <div className="wrapper">
      <CommonHeader />
      <Router />
    </div>
  );
}

export default App;