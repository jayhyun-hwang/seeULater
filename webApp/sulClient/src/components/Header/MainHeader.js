import LogoAlligator from '../img/alligator.png';
import "./MainHeader.css"

function MainHeader() {
    const handlerClick = () => {
        window.location.href="/";
    }
    return (
        <header id="header-main">
            <div className="main-header" onClick={handlerClick}>
                <h1>seeULater</h1><img className="main-logo-img" src={LogoAlligator} alt="seeULater" />
            </div>
        </header>
    );
}

export default MainHeader;