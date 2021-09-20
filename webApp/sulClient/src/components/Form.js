import Axios from 'axios';
import React from "react";

const Form = ({ setInputText, urls, setUrls, inputText, setStatus }) => {
    //Here I can write javascript code and function
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const submitUrlHandler = (e) => {
        e.preventDefault();
        Axios.post('http://127.0.0.1:3001/url', {
            userID: 1,  //set userid
            url: inputText
        }).then(() => {
            setInputText("");
            setUrls([
                ...urls, {text: inputText, completed: false, id: Math.random() * 1000 },
            ]);
            alert("store success.");
        });
    };
    const statusHandler = (e) => {
        setStatus(e.target.value);
    }
    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="url-input" />
            <button onClick={submitUrlHandler} className="url-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="urls" className="filter-url">
                    <option value="all">All</option>
                    <option value="completed">Read</option>
                    <option value="uncompleted">Unread</option>
                </select>
            </div>
        </form>
    );
}

export default Form;