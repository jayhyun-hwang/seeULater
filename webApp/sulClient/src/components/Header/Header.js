import LogoAlligator from '../img/alligator.png';

function Header() {
    const handlerClick = () => {
        window.location.href="/";
    }
    return (
        <header>
            <div className="main-header" onClick={handlerClick}>
                <h1>seeULater</h1><img className="main-logo-img" src={LogoAlligator} alt="seeULater" />
            </div>
        </header>
    );
}

export default Header;