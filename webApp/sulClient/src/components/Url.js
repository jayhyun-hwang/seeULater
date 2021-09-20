import React from "react";

const Url = ({ text, url, setUrls, urls }) => {
    //Events
    const deleteHandler = () => {
        console.log(url);
        setUrls(urls.filter((el) => el.id !== url.id));
    };
    const completeHandler = () => {
        setUrls(
            urls.map((item) => {
                if (item.id === url.id) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            })
        );
    };
    return (
        <div className="url">
            <li className={`url-item ${url.completed ? "completed" : ""}`}>{text}</li>
            <button onClick={completeHandler} className="complete-btn">
                <i className="fas fa-check"></i>
            </button>
            <button onClick={deleteHandler} className="trash-btn">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};

export default Url;