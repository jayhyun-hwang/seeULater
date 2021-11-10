import React, { useState, useEffect } from "react";
import '../../App.css';
import Axios from 'axios';
//Importing Componentssrc/components
import MainHeader from "src/components/Header/MainHeader";
import Form from "../Form/Form";
import UrlList from "../UrlList/UrlList";

// const define = require("../../define/define");

import define from "src/define/define";

function Main() {

  //사용할 변수들과 상태를 설정한다.(초기값)
  const [urls, setUrls] = useState([]);
  // const [urlID, setUrlID] = useState("");
  // const [userID, setUserID] = useState("");
  // const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const [memo, setMemo] = useState("");
  // const [directory, setDirectory] = useState("");
  // const [regdate, setRegdate] = useState("");

  // const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("all");
  const [filteredUrls, setFilteredUrls] = useState([]);

  //RUN ONCE when the app start 
  useEffect(() => {
    getUrls();
  }, []); // , [] 컴포넌트가 마운트 될 때(렌더링) 한번 실행한다. 
  //USE EFFECT
  //핸들러가 실행될 때 마다 실행하는 함수.
  useEffect(() => {
    // console.log('hey');
    filterHandler();
    saveLocalUrls();
    // getUrls();
  }, [urls, status]); //urls, status값이 바뀔 때마다 실행된다.
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
  //urls(url 데이터셋)를 로컬스토리지에 저장, update 날짜를 설정하여 cache 설정 가능할 것 같아보임.
  const saveLocalUrls = () => {
    localStorage.setItem('urls', JSON.stringify(urls));
  };
  const getUrls = () => {
    // if (localStorage.getItem('urls') === null) {
    //   localStorage.setItem('urls', JSON.stringify([]));
    // } else {
    //   let urlLocal = JSON.parse(localStorage.getItem("urls"));
    //   setUrls(urlLocal);
    // }
    console.log(define.URL);
    Axios.get(define.URL + "/urls").then((response) => {
      // console.log(response.data);
      setUrls(response.data);
      // console.log(response);
    });
  }
  return (
    <div className="Main">
      <MainHeader />
      <div className="Body">
        {/* <Form
          inputText={inputText}
          urls={urls}
          setUrls={setUrls}
          setInputText={setInputText}
          setStatus={setStatus}
        // inputText={inputText}
        // urls={urls}
        // setUrls={setUrls}
        // setInputText={setInputText}
        // setStatus={setStatus}
        /> */}
        <UrlList
          filteredUrls={filteredUrls}
          setUrls={setUrls}
          urls={urls}
        />
      </div>
    </div>
  );
}

export default Main;