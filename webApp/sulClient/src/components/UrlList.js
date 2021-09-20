import React from 'react';
//Import components
import Url from './Url';

const UrlList = ({urls, setUrls, filteredUrls}) => {
    console.log(filteredUrls);
    return (
        <div className="url-container">
            <ul className="url-list">
                {filteredUrls.map((url) => (
                    <Url 
                    setUrls={setUrls}
                    urls={urls} 
                    text={url.text}
                    url={url} 
                    key={url.id}
                    />
                ))}
            </ul>
        </div>

    );
};

export default UrlList;