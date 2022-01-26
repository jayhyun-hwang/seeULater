import "./UrlList.css";
//Import components
import Url from './Url';
import ListButton from './ListButton';

const UrlList = ({ count, setCount, page, setPage, filteredUrls, setUrls, urls }) => {
    // const clickCloseHandler = () => {
    //     if (page < 1) {
    //         return;
    //     }
    //     setPage(page - 1)
    // };
    // const clickMoreHandler = () => {
    //     setPage(page + 1)
    // };
    // const listButton = () => {
    //     console.log(`const listButton = () => {${count}, ${page}}`);
    //     let close = (1 < page) ?
    //         (
    //             <button onClick={clickCloseHandler} className="button-close">close &nbsp;
    //                 <i class="fa fa-angle-up" aria-hidden="true"></i>
    //             </button>
    //         ) :
    //         null;

    //     let more = (count > page * 15) ?
    //         (
    //             <button onClick={clickMoreHandler} className="button-showMore">more &nbsp;&nbsp;
    //                 <i class="fa fa-angle-down" aria-hidden="true"></i>
    //             </button>
    //         ) :
    //         null;
    //     return [close, more];
    // };
    const enableCheckbox = (e) => {
        alert(e.target.checked)
    }
    return (
        <div className="url-container">
            <ul className="url-list">
                <h2>Total &nbsp; {count}</h2>
                {/* <input type={"checkbox"} className="input-urlList-checkbox" onChange={enableCheckbox} /> Check On */}
                {filteredUrls.map((url, index) => (
                    <Url key={url.url_id}
                        index={index}
                        setUrls={setUrls}
                        urls={urls}
                        url={url}
                        urlID={url.url_id}
                        count={count}
                        setCount={setCount}
                    />
                ))}
                <div className="listButton-wrapper">
                    <ListButton
                        count={count}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </ul>
        </div>

    );
};

export default UrlList;