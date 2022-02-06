import React from "react";
import './App.css';
import useToken from "./components/useToken";
import Router from "./components/Router";
import PreRouter from "./components/preRouter";
import PreHeader from "./components/Header/PreHeader";
import CommonHeader from "./components/Header/CommonHeader";
import Footer from "./components/Footer/Footer";

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <PreHeader />
        <PreRouter setToken={setToken} />
        <Footer/>
      </>
    )
  }
  
  return (
    <div className="wrapper">
      <CommonHeader />
      <Router />
      <Footer/>
    </div>
  );
}

export default App;