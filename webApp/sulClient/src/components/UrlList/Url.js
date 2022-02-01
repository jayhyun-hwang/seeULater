import React from "react";
import "./UrlList.css";
// import LinkPreview from '@ashwamegh/react-link-preview';
import LoadingImg from '../img/loading.png';
import NoImg from '../img/no-image-icon.png';
import Axios from 'axios';
import define from "../../define/define";
import timeUtils from "../../utils/timeUtils"


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

// utc 시간을 local시간으로 변환
const getLocalDateTime = (regdate) => {
    let localDate = new Date(regdate)
    const timeString = timeUtils.dateToLocalTimeString(localDate)
    return timeString
}

const Url = ({ index, url, setUrls, urls, count, setCount, seturlChecks, setisDragging }) => {
    //Events
    const LinkHandler = () => {
        window.open(url.url, '_blank', 'noopener, noreferrer');
    }

    const urlCheckBox = () => {
        return
    }

    const deleteHandler = (e) => {
        // console.log("url= " + url.url);
        // console.log("url.urlID= " + url.url_id);
        if (window.confirm(`Are you sure you want to delete this bookmark?`) === false) {
            return
        }
        Axios.delete(`${define.URL}/urls/${url.url_id}`
            // , { withCredentials: true }
        )
            .then((response) => {
                // 삭제한 url_id와 다른 것들만 urls에 세팅
                if (response.status !== 200) {
                    alert("oops, error");
                    return
                }
                setUrls(urls.filter((val) => {
                    return val.url_id !== url.url_id
                }))
                setCount(count - 1)
                alert("delete!");
            })
    };
    const completeHandler = () => {
        setUrls(
            urls.map((item) => {
                if (item.user_id === url.user_id) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            })
        );
    };

    const urlDragStart = (event) => {
        event.target.style.opacity = '0.4'
        setisDragging(true)
        event.dataTransfer.setData("urlID", url.url_id)
    }
    const urlDragEnd = (event) => {
        event.target.style.opacity = '1'
        setisDragging(false)
        // event.dataTransfer.setData("urlID", url.url_id)
    }

    return (
        <div className="url" draggable="true" onDragStart={urlDragStart} onDragEnd={urlDragEnd} >
            <div className='url-upper'>
                <p className="url_a-index">
                    {/* todo 체크박스로 일괄처리 */}
                    {/* <input type={"checkbox"} className="input-url-checkbox">
                    </input> */}
                    {urlCheckBox}{index + 1}
                </p>
                <a className={`url_a ${url.completed ? "completed" : ""}`} href={url.url} target="_blank" rel="noreferrer">{url.title ? url.title : url.url}
                </a>
            </div>
            <div className="url-preview-and-button">
                <div onClick={LinkHandler}>
                    {/* <LinkPreview url={url.url} render={CustomComponent} /> */}
                    <div className="preview-wrapper">
                        <div className="img-div">
                            <img src={url.icon_img ? url.icon_img : NoImg} alt={(url.status) ? url.title : ""} />
                        </div>
                        <div className="p-div">
                            <div>
                                <p className="url-url-p">{url.url}</p>
                                <p></p>
                                <p className="url-description-p"></p>
                            </div>
                            <div>
                                <p className="url-regist-p">{getLocalDateTime(url.regdate)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="url-button-div">
                    {/* <button onClick={completeHandler} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button> */}
                    <button onClick={deleteHandler} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Url;