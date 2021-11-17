import "./UrlList.css";
import React from 'react';
//Import components
import Url from './Url';

function listButton(count, limit) {

    let fold = (15 < limit) ?
        (
            <button className="button-fold">close &nbsp;
                <i class="fa fa-angle-up" aria-hidden="true"></i>
            </button>
        ) :
        null

    let more = (count > limit) ?
        (
            <button className="button-showMore">more &nbsp;&nbsp;
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </button>
        ) :
        null

    return [fold, more];
}

const UrlList = ({ count, limit, urls, setUrls, filteredUrls }) => {
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
                    {listButton(count, limit)}
                </div>
            </ul>
            {/* 더보기 버튼 생성, 조건부 생성  */}
        </div>

    );
};

export default UrlList;