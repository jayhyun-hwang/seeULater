import LogoAlligator from '../img/alligator.png';
import chrome_web_store from '../img/chrome_web_store-32.png';
import define from '../../define/define'
import "./Footer.css";


// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;

function Footer() {
    const handlerClick = () => {
        window.location.href = "/";
    }
    const extensionClick = () => {
        window.open("https://chrome.google.com/webstore/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp", '_blank');
    }
    return (
        <footer className="footer-common-footer">
            <div className='div-footer'>
                seeULater {define.VERSION} Created by&nbsp;
                <a className='a-footer' href='https://www.linkedin.com/in/jaehyun-hwang-344522201/' target="_blank">
                    Jayhyun-Hwang
                </a>
            </div>
            <div className='div-footer'>
                <span>
                    contact email:&nbsp;
                    <a className='a-footer' href='mailto:wogus0501@gmail.com' target="_blank">
                        wogus0501@gmail.com
                    </a>
                </span>
            </div>
            <div className='div-footer'>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater' target="_blank">
                <i class="fa fa-github" aria-hidden="true"></i>GitHub Project
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/issues' target="_blank">
                    Issues
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/issues' target="_blank">
                    Chrome Web Stroe
                </a>
            </div>
        </footer>
    );
}

export default Footer;