import define from '../../define/define'
import "./Footer.css";


// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;

function Footer() {
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
                    GitHub Project
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/issues' target="_blank">
                    Issues
                </a>
                <span> · </span>
                <a className='a-footer' href='https://chrome.google.com/webstore/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp' target="_blank">
                    Chrome Web Store
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/blob/main/Privacy_Policy.md' target="_blank">
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
}

export default Footer;