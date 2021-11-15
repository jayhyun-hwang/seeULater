import React from 'react';
//Import components
import Url from './Url';

const UrlList = ({count, urls, setUrls, filteredUrls}) => {
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
            </ul>
            {/* 더보기 버튼 생성, 조건부 생성  */}
        </div>

    );
};

export default UrlList;