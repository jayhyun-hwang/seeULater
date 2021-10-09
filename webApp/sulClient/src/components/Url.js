import React from "react";
import LinkPreview from '@ashwamegh/react-link-preview';
import LoadingImg from './img/loading.png';
import Axios from 'axios';

function CustomComponent({ loading, preview }) {
    return loading
        ? (
            <div className="preview-wrapper">
                <div className="img-div">
                    <img src={LoadingImg} alt="..." />
                </div>
                <div className="p-div">
                    <p>&nbsp;</p>
                    <p>Loading... </p>
                    <p className="p-description">&nbsp;</p>
                </div>
            </div>
        )
        : (
            <div className="preview-wrapper">
                <div className="img-div">
                    <img src={preview.img} /*alt={preview.title}*/ />
                </div>
                <div className="p-div">
                    <p>{preview.domain}</p>
                    <p>{preview.title}</p>
                    <p className="p-description">{preview.description}</p>
                </div>
            </div>
        )
}

const Url = ({ url, setUrls, urls }) => {
    //Events
    const LinkHandler = () => {
        window.open(url.url, '_blank');
    }
    const deleteHandler = (e) => {
        console.log("url= " + url.url);
        console.log("url.urlID= " + url.url_id);
        Axios.delete(`http://3.36.36.62:3001/urls/${url.url_id}`)
            .then((response) => {
                // 삭제한 url_id와 다른 것들만 urls에 세팅
                setUrls(urls.filter((val) => {
                    return val.url_id !== url.url_id
                }))
                alert("delete!");
            })
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
            <div>
                <a className={`url-item ${url.completed ? "completed" : ""}`} href={url.url} target="_blank">{url.url}</a>
            </div>
            <div className="url-preview-button">
                <div onClick={LinkHandler}>
                    {/* <LinkPreview url={url.url} render={CustomComponent} />
                     */}
                    <div className="preview-wrapper">
                        <div className="img-div">
                            <img src={LoadingImg} /*alt={preview.title}*/ />
                        </div>
                        <div className="p-div">
                            <p>{url.url}</p>
                            <p></p>
                            <p className="p-description"></p>
                        </div>
                    </div>
                </div>
                <div className="url-button-div">
                    <button onClick={completeHandler} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Url;