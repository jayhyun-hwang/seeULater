import React, { useState, useEffect, useRef } from "react";
import '../../App.css';
import Axios from 'axios';
//Importing Componentssrc/components
import MainHeader from "src/components/Main/MainHeader";
import Directories from "src/components/Directories/Directories";
import Form from "../Form/Form";
import UrlList from "../UrlList/UrlList";
import seeulater_demo from '../img/seeulater_demo.gif';
import './Main.css'

// const define = require("../../define/define");

import define from "src/define/define";
import { cookieClient, useCookies } from "react-cookie";
const argMode = process.env.REACT_APP_MODE;
Axios.defaults.withCredentials = argMode ? true : false;
function Main() {
  // console.log("Mode", argMode)
  // console.log("Mode에 따른 withcredentials", Axios.defaults.withCredentials)

  //사용할 변수들과 상태를 설정한다.(초기값)
  const [urls, setUrls] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [directoryID, setDirectoryID] = useState(0);
  const [directoryList, setDirectoryList] = useState([]);
  const [updateDirectories, setUpdateDirectories] = useState(false);
  const [updateUrls, setUpdateUrls] = useState(false);

  const [status, setStatus] = useState("all");
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  //RUN ONCE when the app start 
  // useEffect(() => {
  //   getUrls();
  // }, []); // , [] 컴포넌트가 마운트 될 때(렌더링) 한번 실행한다. 
  //USE EFFECT
  //핸들러가 실행될 때 마다 실행하는 함수.
  useEffect(() => {
    // console.log('hey');
    filterHandler();
    // saveLocalUrls();
  }, [urls, status]); //urls, status값이 바뀔 때마다 실행된다.

  // dir 리스트 받아오기
  useEffect(() => {
    console.log("getDirectories")
    getDirectories();
  }, [updateDirectories]);

  //page 이동 시 실행
  useEffect(() => {
    getUrls()
  }, [page]);
  
  // 목록 업데이트 필요할 시, page 초기화, 또는 조회
  const isMounted = useRef(false)
  useEffect(() => {
    // 마운트 시(처음 로드 시), 실행 막기
    if (!isMounted.current) {
      // console.log("마운트 시점!")
      isMounted.current = true
      return
    }
    // console.log("마운트 X!")
    if (page > 1) {
      setPage(1)
    } else {
      getUrls()
    }
  }, [updateUrls])

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
  const getDirectories = () => {
    Axios.get(`${define.URL}/directories`
    ).then((response) => {
      setDirectoryList(response.data.rows);
    }).catch((err) => {
      return err.response;
    });
  }
  const getUrls = () => {
    // if (localStorage.getItem('urls') === null) {
    //   localStorage.setItem('urls', JSON.stringify([]));
    // } else {
    //   let urlLocal = JSON.parse(localStorage.getItem("urls"));
    //   setUrls(urlLocal);
    // }
    // console.log(define.URL);
    console.log("getUrls 실행!")
    Axios.get(`${define.URL}/urls/${directoryID}?page=${page}`
      // , { withCredentials: true }
    ).then((response) => {
      // console.log(response);
      // if (response.status === 401) {
      //   localStorage.removeItem("token");
      //   window.location.href = "/";
      // }
      setCount(response.data.count);
      // todo offset을 파라미터로 설정, 받아온 offset 세팅
      setUrls(response.data.rows);
      // console.log(response);
      setDirectoryID(response.data.directoryID)
    }).catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        removeCookie("token");
        window.location.href = "/";
      }
      return err.response;
    });
  }
  return (
    <div>
      <Directories
        directoryList={directoryList}
        directoryID={directoryID}
        setDirectoryID={setDirectoryID}
        updateDirectories={updateDirectories}
        setUpdateDirectories={setUpdateDirectories}
        updateUrls={updateUrls}
        setUpdateUrls={setUpdateUrls}
      />
      <div className="Main">
        <MainHeader />
        <div className="Body">
          <Form
            updateUrls={updateUrls}
            setUpdateUrls={setUpdateUrls}
          // inputText={inputText}
          // urls={urls}
          // setUrls={setUrls}
          // setInputText={setInputText}
          // setStatus={setStatus}
          />
          {/* <img id="img-tutorial" src={seeulater_demo} alt="seeulater demo" /> */}
          <UrlList key="url list"
            count={count}
            setCount={setCount}
            page={page}
            setPage={setPage}
            filteredUrls={filteredUrls}
            setUrls={setUrls}
            urls={urls}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;