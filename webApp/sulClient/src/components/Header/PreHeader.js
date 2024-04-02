import LogoAlligator from '../img/alligator.png';
import chrome_web_store from '../img/chrome_web_store-32.png';
import "./CommonHeader.css";


// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;

function CommonHeader() {
    const handlerClick = () => {
        window.location.href = "/";
    }
    const extensionClick = () => {
        window.open("https://chromewebstore.google.com/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp", '_blank');
    }
    return (
        <div className="common-header-div">
            <header className="common-header">
                <div id="div-header-home" onClick={handlerClick}>
                    {argMode} seeULater&nbsp;
                    <img id="home-img" src={LogoAlligator} alt="seeULater" />
                </div>
                <div className='div-header-menu'>
                    <div id="div-extension-pre" onClick={extensionClick}>
                        Chrome Web Store&nbsp;
                        <img id="img-extension" src={chrome_web_store} alt="chrome extension" />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default CommonHeader;