import React from "react";
import "./UrlList.css";
// import LinkPreview from '@ashwamegh/react-link-preview';
import LoadingImg from '../img/loading.png';
import NoImg from '../img/no-image-icon.png';
import Axios from 'axios';
import define from "../../define/define";


// function CustomComponent({ loading, preview }) {
//     return loading
//         ? (
//             <div className="preview-wrapper">
//                 <div className="img-div">
//                     <img src={LoadingImg} alt="..." />
//                 </div>
//                 <div className="p-div">
//                     <p>&nbsp;</p>
//                     <p>Loading... </p>
//                     <p className="p-description">&nbsp;</p>
//                 </div>
//             </div>
//         )
//         : (
//             <div className="preview-wrapper">
//                 <div className="img-div">
//                     <img src={preview.img} /*alt={preview.title}*/ />
//                 </div>
//                 <div className="p-div">
//                     <p>{preview.domain}</p>
//                     <p>{preview.title}</p>
//                     <p className="p-description">{preview.description}</p>
//                 </div>
//             </div>
//         )
// }

const getDateTime = (url) => {
    return url.regdate.slice(0,16).replace("T", "\t")
}

const Url = ({ index, url, setUrls, urls }) => {
    //Events
    const LinkHandler = () => {
        window.open(url.url, '_blank');
    }
    const deleteHandler = (e) => {
        // console.log("url= " + url.url);
        // console.log("url.urlID= " + url.url_id);
        Axios.delete(`${define.URL}/urls/${url.url_id}`, { withCredentials: true })
            .then((response) => {
                // 삭제한 url_id와 다른 것들만 urls에 세팅
                if (response.status !== 200) {
                    alert("oops, error");
                    return
                }
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
            <div className='url-upper'>
                <p className="url_a-index">{index+1}</p>
                <a className={`url_a ${url.completed ? "completed" : ""}`} href={url.url} target="_blank" rel="noreferrer">{url.title ? url.title : url.url}
                </a>
            </div>
            <div className="url-preview-and-button">
                <div onClick={LinkHandler}>
                    {/* <LinkPreview url={url.url} render={CustomComponent} /> */}
                    <div className="preview-wrapper">
                        <div className="img-div">
                            <img src={url.icon_img ? url.icon_img : NoImg} alt={url.title} />
                        </div>
                        <div className="p-div">
                            <div>
                                <p className="url-url-p">{url.url}</p>
                                <p></p>
                                <p className="url-description-p"></p>
                            </div>
                            <div>
                                <p className="url-regist-p">{getDateTime(url)}</p>
                            </div>
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