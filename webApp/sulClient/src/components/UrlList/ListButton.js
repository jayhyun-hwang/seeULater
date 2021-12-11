import "./UrlList.css";

const ListButton = ({ count, page, setPage }) => {
    const clickCloseHandler = () => {
        if (page < 1) {
            return;
        }
        setPage(page - 1)
    };
    const clickMoreHandler = () => {
        setPage(page + 1)
    };
    console.log(`const listButton = () => {${count}, ${page}}`);
    let close = (1 < page) ?
        (
            <button onClick={clickCloseHandler} className="button-close">close &nbsp;
                <i class="fa fa-angle-up" aria-hidden="true"></i>
            </button>
        ) :
        null;

    let more = (count > page * 15) ?
        (
            <button onClick={clickMoreHandler} className="button-showMore">more &nbsp;&nbsp;
                <i class="fa fa-angle-down" aria-hidden="true"></i>
            </button>
        ) :
        null;
    return [close, more];
};

export default ListButton;