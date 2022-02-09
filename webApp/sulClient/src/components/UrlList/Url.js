import React, { useState, useEffect, useRef } from "react";
import "./UrlList.css";
// import LinkPreview from '@ashwamegh/react-link-preview';
import LoadingImg from '../img/loading.png';
import NoImg from '../img/no-image-icon.png';
import Axios from 'axios';
import define from "../../define/define";
import timeUtils from "../../utils/timeUtils"
import defineConstraint from "src/define/defineConstraint";

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

async function submitPutUrlTitle(url_id, newTitle) {
    return Axios.put(`${define.URL}/urls/title`, {
        urlID: url_id,
        urlTitle: newTitle
    }).then((response) => {
        return response
    }).catch((err) => {
        return err.response
    })
}

const Url = ({ index, url, setUrls, urls, count, setCount, seturlChecks, setisDragging }) => {
    const [urlTitle, seturlTitle] = useState(url.title)
    const [isEditingUrlTitle, setisEditingUrlTitle] = useState(false)
    const inputUrlTitleRef = useRef(null)

    //Events
    const LinkHandler = () => {
        // window.open(url.url, '_blank', 'noopener, noreferrer');
        window.open(url.url, '_blank');
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

    const inputUrlTitleClick = e => {
        // 이벤트 전파 막기위해
        e.stopPropagation()
        // event 일 시, this 대신 e.target을 사용하자
        e.target.select()
        // document.querySelector(".input-directory-name").select()
    }
    const checkeditUrlTitle = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        //유효성 검사
        let inputUrlTitle = inputUrlTitleRef.current.value
        // 이름 같으면 return
        const oldTitle = urlTitle
        const newTitle = inputUrlTitle
        if (oldTitle === newTitle) {
            setisEditingUrlTitle(false)
            return
        }
        if (!inputUrlTitle) {
            alert("Enter the Title.")
            return
        }
        inputUrlTitle = inputUrlTitle.trim()
        if (!inputUrlTitle) {
            alert("Enter the Title.")
            return
        }
        if (inputUrlTitle.length > defineConstraint.TITLELIMIT) {
            alert(`Enter the title within ${defineConstraint.TITLELIMIT} characters.`)
            return
        }
        if (window.confirm(`Do you want to change this title to [${newTitle}]`) === false) {
            return
        }
        const response = await submitPutUrlTitle(url.url_id, newTitle)
        switch (response.status) {
            case 200:
                break;
            default:
                alert(`oops, error: ${response}`)
                return
        }
        seturlTitle(newTitle)
        setisEditingUrlTitle(false)
    }
    const canceleditUrlTitle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setisEditingUrlTitle(false)
    }
    const editUrlTitle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // 현재 dir를 지정
        // setdirectoryName(directory.name)
        if (isEditingUrlTitle) {
            return
        }
        setisEditingUrlTitle(true)
    };
    const inputUrlKeyUp = async (e) => {
        e.preventDefault()
        // console.log(e.key)
        switch (e.key) {
            case "Escape":
                canceleditUrlTitle(e)
                break;
            case "Enter":
                const newTitle = inputUrlTitleRef.current.value
                if (window.confirm(`Do you want to change this title to [${newTitle}]`) === false) {
                    return
                }
                const response = await submitPutUrlTitle(url.url_id, )
                switch (response.status) {
                    case 200:
                        break;
                    default:
                        alert(`oops, error: ${response}`)
                        return
                }
                seturlTitle(newTitle)
                setisEditingUrlTitle(false)
                break;
            default:
                break;
        }
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
                {/* <a className={`url_a ${url.completed ? "completed" : ""}`} href={url.url} target="_blank" rel="noreferrer">{url.title ? url.title : url.url} */}
                {/* <a className={`url_a ${url.completed ? "completed" : ""}`} href={url.url} target="_blank">{url.title ? url.title : url.url} */}
                <div className="div-url_a-wrapper">
                    {isEditingUrlTitle
                        ? (
                            <input className="input-directory-name input-url-title"
                                ref={inputUrlTitleRef}
                                onClick={inputUrlTitleClick}
                                defaultValue={urlTitle}
                                onKeyUp={inputUrlKeyUp}
                            >
                                {/*onBlur={inputDirectoryNameFocusOut}>*/}
                            </input>
                        ) :
                        (
                            <a className="url_a" href={url.url} target="_blank">{urlTitle ? urlTitle : url.url}
                            </a>
                        )}
                    {/* <a className="url_a" href={url.url} target="_blank">{url.title ? url.title : url.url}
                    </a> */}
                    {isEditingUrlTitle
                        ?
                        (
                            <div className="div-directory-check-btn">
                                <button onClick={checkeditUrlTitle} className="directory-check-btn input-edit-btn">
                                    <i className="fa fa-check"></i>
                                </button>
                                <button onClick={canceleditUrlTitle} className="directory-cancel-btn input-edit-btn">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            // null
                        )
                        :
                        (
                            <button onClick={editUrlTitle} className="directory-edit-btn input-edit-btn">
                                <i className="fas fa-edit"></i>
                            </button>
                        )
                    }
                </div>
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
        </div >
    );
};

export default Url;