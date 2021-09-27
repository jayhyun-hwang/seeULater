import { useHistory } from "react-router-dom";
import LogoAlligator from './img/alligator.png';
import App from '../App';

function Header() {
    var history = useHistory();

    function handleClick() {
        history.push(App);
    }

    return (
        <header>
            <div className="main-header" onClick={handleClick}>
                <h1>seeULater</h1><img className="main-logo-img" src={LogoAlligator} alt="seeULater" />
            </div>
        </header>
        // <button type="button" onClick={handleClick}>
        //   Go home
        // </button>
    );
}

export default Header;