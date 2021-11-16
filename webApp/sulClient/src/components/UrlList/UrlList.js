import React from 'react';
//Import components
import Url from './Url';

function listButton(count, offset) {
    return (count > offset)
        ?
        (
            <button className="button-showMore">show more
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </button>
        ):
        null
}

const UrlList = ({ count, offset, urls, setUrls, filteredUrls }) => {
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
                {listButton(count, offset)}
            </ul>
            {/* 더보기 버튼 생성, 조건부 생성  */}
        </div>

    );
};

export default UrlList;