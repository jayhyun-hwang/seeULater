import React from 'react';
//Import components
import Url from './Url';

const UrlList = ({urls, setUrls, filteredUrls}) => {
    console.log("tt");
    console.log(urls);
    console.log(filteredUrls);
    return (
        <div className="url-container">
            <ul className="url-list">
                {filteredUrls.map((url) => (
                    <Url 
                    setUrls={setUrls}
                    urls={urls}
                    url={url}
                    urlID={url.urlID}
                    />
                ))}
            </ul>
        </div>

    );
};

export default UrlList;