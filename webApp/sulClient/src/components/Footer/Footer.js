import define from '../../define/define'
import "./Footer.css";
import Axios from "axios";
import { useEffect, useState } from 'react';


// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;
async function getVersion() {
    return Axios.get(define.URL + "/server/version")
        .then((response) => {
            return response;
        }).catch((error) => {
            return error.response;
        })
}
function Footer() {
    const [version, setversion] = useState("")
    useEffect(async () => {
        const result = await getVersion()
        if (result.status !== 200) {
        } else {
            setversion(result.data)
        }
    }, [])
    return (
        <footer className="footer-common-footer">
            <div className='div-footer'>
                seeULater {version} Created by&nbsp;
                <a className='a-footer' href='https://www.linkedin.com/in/jaehyun-hwang-344522201/' target="_blank" rel="noreferrer">
                    Jayhyun-Hwang
                </a>
            </div>
            <div className='div-footer'>
                <span>
                    contact email:&nbsp;
                    <a className='a-footer' href='mailto:wogus0501@gmail.com' target="_blank" rel="noreferrer">
                        wogus0501@gmail.com
                    </a>
                </span>
            </div>
            <div className='div-footer'>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater' target="_blank" rel="noreferrer">
                    GitHub Project
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/issues' target="_blank" rel="noreferrer">
                    Issues
                </a>
                <span> · </span>
                <a className='a-footer' href='https://chromewebstore.google.com/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp' target="_blank" rel="noreferrer">
                    Chrome Web Store
                </a>
                <span> · </span>
                <a className='a-footer' href='https://github.com/jayhyun-hwang/seeULater/blob/main/Privacy_Policy.md' target="_blank" rel="noreferrer">
                    Privacy Policy
                </a>
            </div>
        </footer>
    );
}

export default Footer;