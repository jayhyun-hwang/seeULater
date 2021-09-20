import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
//Importing Components
import Form from "./components/Form";
import UrlList from "./components/UrlList";

function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [urls, setUrls] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredUrls, setFilteredUrls] = useState([]);
  
  //RUN ONCE when the app start
  useEffect(() => {
    getLocalUrls();
  }, []);
  //USE EFFECT
  //핸들러가 실행될 때 마다 실행하는 함수.
  useEffect(() => {
    // console.log('hey');
    filterHandler();
    saveLocalUrls();
  }, [urls, status]);
  //Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredUrls(urls.filter((url) => url.completed === true));
        break;
      case 'uncompleted':
        setFilteredUrls(urls.filter((url) => url.completed === false));
        break;
      default:
        setFilteredUrls(urls);
        break;
    }
  };
  //Save to Local
  const saveLocalUrls = () => {
    localStorage.setItem('urls', JSON.stringify(urls));
  };
  const getLocalUrls = () => {
    if (localStorage.getItem('urls') === null) {
      localStorage.setItem('urls', JSON.stringify([]));
    } else {
      let urlLocal = JSON.parse(localStorage.getItem("urls"));
      setUrls(urlLocal);
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
          urls={urls}
          setUrls={setUrls}
          setInputText={setInputText}
          setStatus={setStatus}

        />
        <UrlList
          filteredUrls={filteredUrls}
          setUrls={setUrls}
          urls={urls}
        />
      </div>
    </div>
  );
}

export default App;
