import "./UrlList.css";
import React, { useEffect } from 'react';
//Import components
import Url from './Url';
const UrlList = ({ count, page, setPage, filteredUrls, setUrls, urls }) => {

    useEffect(() => {
        listButton();
    }, [page]); // page 값이 바뀔 때마다 실행된다.

    const clickCloseHandler = () => {
        if (page < 1) {
            return;
        }
        setPage(page - 1)
    };
    const clickMoreHandler = () => {
        setPage(page + 1)
    };
    const listButton = (count, page) => {

        let close = (1 < page) ?
            (
                <button onClick={clickCloseHandler} className="button-close">close &nbsp;
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </button>
            ) :
            null

        let more = (count > page * 15) ?
            (
                <button onClick={clickMoreHandler} className="button-showMore">more &nbsp;&nbsp;
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </button>
            ) :
            null

        return [close, more];
    }
    // console.log("tt");
    // console.log(urls);
    // console.log(filteredUrls);
    return (
        <div className="url-container">
            <ul className="url-list">
                <h2>Total &nbsp; {count}</h2>
                {filteredUrls.map((url) => (
                    <Url key={url.url_id}
                        setUrls={setUrls}
                        urls={urls}
                        url={url}
                        urlID={url.url_id}
                    />
                ))}
                <div className="listButton-wrapper">
                    {listButton(count, page)}
                </div>
            </ul>
            {/* 더보기 버튼 생성, 조건부 생성  */}
        </div>

    );
};

export default UrlList;