import LogoAlligator from '../img/alligator.png';
import "./CommonHeader.css";

function CommonHeader() {
    const handlerClick = () => {
        window.location.href = "/";
    }
    const logoutClick = () => {
        // todo
        // post token to black list
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return (
        <div className="common-header-div">
            <header className="common-header">
                <div onClick={handlerClick}>
                    div1
                </div>
                <div onClick={logoutClick}>
                    div2
                </div>
            </header>
        </div>
    );
}

export default CommonHeader;