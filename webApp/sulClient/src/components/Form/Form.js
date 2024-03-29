import Axios from 'axios';
import "./Form.css";
import React, { useState } from "react";
import define from '../../define/define';
import defineConstraint from 'src/define/defineConstraint';

const Form = ({ updateUrls, setUpdateUrls, directoryID }) => {
    //Here I can write javascript code and function
    const [inputUrl, setInputUrl] = useState()
    const [inputTitle, setInputTitle] = useState()

    // 이벤트를 파라미터로 함수 만들기, onChange 이벤트 등록
    const onChangeInputUrl = (e) => {
        setInputUrl(e.target.value);
    };
    const onChangeInputTitle = (e) => {
        // title 글자 수 제한
        if (e.target.value.length > defineConstraint.TITLELIMIT) {
            alert(`Enter the title name within ${defineConstraint.TITLELIMIT} characters.`)
            return
        }
        setInputTitle(e.target.value);
    };
    const submitUrlHandler = (e) => {
        e.preventDefault();
        e.currentTarget.blur()
        if (!inputUrl || !inputUrl.match(/\./g) || inputUrl.match(/\./g).length < 1) {
            alert("Invalid URL.");
            return;
        }
        const sliced = inputUrl.slice(0, 5)
        let urlVal;
        if (sliced !== "https" && sliced !== "http:") {
            urlVal = "https://" + inputUrl
        } else {
            urlVal = inputUrl
        }
        let postTitle;
        if (inputTitle) {
            postTitle = inputTitle.trim()
        } else {
            postTitle = inputTitle
        }
        if (!postTitle) {
            postTitle = urlVal
        } else {
            if (postTitle.length > defineConstraint.TITLELIMIT) {
                alert(`Enter the title name within ${defineConstraint.TITLELIMIT} characters.`)
                return
            }
        }

        Axios.post(define.URL + "/urls", {
            url: urlVal,
            title: postTitle,
            directoryID: directoryID
        }).then((response) => {
            if (response.status === 200) {
                setUpdateUrls(!updateUrls);
                setInputUrl("");
                setInputTitle("");
            } else {
                alert("Please try again in a few minutes.");
                window.location.href = "/";
            }
        }).catch((err) => {
            alert("Please try again in a few minutes.");
            window.location.href = "/";
        });
    };

    // onChange 등록, all, complete, uncomplete 바뀔 때 상태 등록
    // const statusHandler = (e) => {
    //     setStatus(e.target.value);
    // }
    return (
        <form className="inputForm">
            <div className="input-addbutton-wrapper">
                <div className='inputs-wrapper'>
                    <input value={inputUrl}
                        type="text"
                        placeholder='https://'
                        onChange={onChangeInputUrl}
                        className="url-url-input" />
                    <div className='div-title-button'>
                        <input value={inputTitle}
                            type="text"
                            placeholder='title'
                            onChange={onChangeInputTitle}
                            className="url-title-input" />
                        <button onClick={submitUrlHandler}
                            className="url-button"
                            type="submit" >
                            <i className="fas fa-plus-square" >
                            </i>
                        </button >
                    </div>
                </div>
            </div> {
                /* <div className="select">
                                <select onChange={statusHandler} name="urls" className="filter-url">
                                    <option value="all">All</option>
                                    <option value="completed">Read</option>
                                    <option value="uncompleted">Unread</option>
                                </select>
                            </div> */
            } </form>
    );
}

export default Form;