import React from "react";
import LinkPreview from '@ashwamegh/react-link-preview';
import LoadingImg from './img/loading.png';

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
            <li className={`url-item ${url.completed ? "completed" : ""}`} onClick={LinkHandler}>{url.url}</li>
            <div className="url-preview-button">
                <div onClick={LinkHandler}>
                <LinkPreview url={url.url} render={CustomComponent}/>
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