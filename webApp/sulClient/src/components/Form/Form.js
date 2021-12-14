import Axios from 'axios';
import "./Form.css";
import React, { useState } from "react";
import define from '../../define/define';

const Form = ({ editUrls, setEditUrls }) => {
    //Here I can write javascript code and function
    const [inputText, setInputText] = useState()

    // 이벤트를 파라미터로 함수 만들기, onChange 이벤트 등록
    const onChangeInput = (e) => {
        // console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitUrlHandler = (e) => {
        e.preventDefault();
    //     Axios.post(define.URL, {
    //         userID: 1,  //set userid
    //         url: inputText
    //     }).then(() => {
    //         setUrls([
    //             ...urls, { url: inputText, completed: false, id: Math.random() * 1000 },
    //         ]);
    //         setInputText("");
    //         alert("store success.");
    //     });
    };

    // onChange 등록, all, complete, uncomplete 바뀔 때 상태 등록
    // const statusHandler = (e) => {
    //     setStatus(e.target.value);
    // }
    return (
        <form className="inputForm">
            <div className="input-addbutton-wrapper">
                <div className='inputs-wrapper'>
                <input value={inputText} onChange={onChangeInput} type="text" className="url-url-input" />
                <input value={inputText} onChange={onChangeInput} type="text" className="url-title-input" />
                </div>
                <button onClick={submitUrlHandler} className="url-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
            </div>
            {/* <div className="select">
                <select onChange={statusHandler} name="urls" className="filter-url">
                    <option value="all">All</option>
                    <option value="completed">Read</option>
                    <option value="uncompleted">Unread</option>
                </select>
            </div> */}
        </form>
    );
}

export default Form;