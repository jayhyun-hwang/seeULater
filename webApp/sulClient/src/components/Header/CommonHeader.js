import { useCookies } from 'react-cookie';
import Axios from "axios";
import LogoAlligator from '../img/alligator.png';
import define from "../../define/define"
import Logout from '../img/logout.png';
import chrome_web_store from '../img/chrome_web_store-32.png';
import "./CommonHeader.css";
import { useEffect, useState } from 'react';


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
async function getUserInfo() {
    return Axios.get(define.URL + "/user")
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response;
        })
}
function CommonHeader() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [userName, setuserName] = useState("")

    useEffect(async () => {
        const result = await getUserInfo()
        if (result.status !== 200) {
        } else {
            setuserName(result.data[0].name)
        }
    }, [])
    
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
        window.scrollTo({
            top: 0,//top: 999999
            left: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className="common-header-div">
            <header className="common-header">
                <div id="div-header-home" onClick={handlerClick}>
                    <span className='span-commonHeader-title'>
                        {argMode} seeULater&nbsp;
                    </span>
                    <img id="home-img" src={LogoAlligator} alt="seeULater" />
                </div>
                <div className='div-userName'>
                    <span className='span-commonHeader-title'>
                        👋 Hello, {userName}&nbsp;
                    </span>
                </div>
                <div className='div-header-menu'>
                    <div id="div-extension" onClick={extensionClick}>
                        <span className='span-commonHeader-title'>
                            Chrome Web Store&nbsp;
                        </span>
                        <img id="img-extension" src={chrome_web_store} alt="chrome extension" />
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