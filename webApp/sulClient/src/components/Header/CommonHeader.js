import { useCookies } from 'react-cookie';
import Axios from "axios";
import LogoAlligator from '../img/alligator.png';
import define from "../../define/define"
import Logout from '../img/logout.png';
import chrome_web_store from '../img/chrome_web_store-32.png';
import "./CommonHeader.css";


// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;

async function smsLogout() {
    return Axios.delete(define.URL + "/logout")
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response;
        })
}
function CommonHeader() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const handlerClick = () => {
        window.location.href = "/";
    }
    const logoutClick = async () => {
        // todo
        // post token to black list
        const result = await smsLogout();
        if (result.status !== 200) {
            // alert(result.data);
        }
        localStorage.removeItem("token");
        removeCookie("token")
        window.location.href = "/";
    }
    const extensionClick = () => {
        window.open("https://chrome.google.com/webstore/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp", '_blank');
    }
    const toTopHandler = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="common-header-div">
            <header className="common-header">
                <div onClick={handlerClick}>
                    {argMode} seeULater&nbsp;
                    <img id="home-img" src={LogoAlligator} alt="seeULater" />
                </div>
                <div className='div-header-menu'>
                    <div id="div-extension" onClick={extensionClick}>
                        <img id="img-extension" src={chrome_web_store} alt="chrome extension" />
                        Chrome Ex&nbsp;
                    </div>
                    <div id="div-logout" onClick={logoutClick}>
                        Logout&nbsp;
                        <img id="logout-img" src={Logout} alt="logout" />
                    </div>
                </div>
            </header>
            <button onClick={toTopHandler} className="btn-toTop">
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    );
}

export default CommonHeader;