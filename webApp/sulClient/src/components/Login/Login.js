import React, { useState } from 'react';
import ProTypes from 'prop-types';
import "./Login.css";
import define from "../../define/define"
import Axios from "axios";
import { Link } from 'react-router-dom';
import seeulater_save from './../img/seeulater_demo_220214.gif'
import seeulater_write from './../img/seeulater_demo_write_220214.gif'
import seeulater_folder from './../img/seeulater_demo_folder_220214.gif'

async function smsLoginUser(loginInfo) {
    return Axios.post(define.URL + "/login", {
        loginInfo
    }).then()
}

export default function Login({ setToken }) {
    const [userUniqueID, setuserUniqueID] = useState();
    const [password, setPassword] = useState();

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const res = await smsLoginUser({
            userUniqueID: userUniqueID,
            password
        });
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.token)

        if (res.data.token) {
            setToken(res.data);
        } else {
            alert(res.data);
        }
        // window.location.replace("/");
    }
    return (
        <div className="div-whole-wrapper">
            <div className='div-help-wrapper'>
                <div className='div-help-title'>
                    <h1 className='h1-login-title'>
                        seeULater
                    </h1>
                    <h2>
                        Easy and convenient bookmark manager
                    </h2>
                </div>
                <div className='div-help'>
                    <div className='div-help-paragraph'>
                        <h3 className='h3-help'>
                            📝 Save bookmarks with one click using &nbsp;
                            <a className='a-footer a-help' href='https://chrome.google.com/webstore/detail/seeulater/pemilclakldcfcijhimggelacjhkjogp' target="_blank">
                                Chrome extension.
                            </a>
                            <br></br>
                            (Ctrl + Shift + S)
                        </h3>
                        <div className='div-img-help-wrapper'>
                            <img className="img-help" src={seeulater_save} alt="seeULater_save" />
                        </div>
                        <h4 className='h3-help'>
                            You can also add a bookmark directly from seeULater website.
                        </h4 >
                        <div className='div-img-help-wrapper'>
                            <img className="img-help" src={seeulater_write} alt="seeULater_write" />
                        </div>
                    </div>
                    <div className='div-help-paragraph'>
                        <h3 className='h3-help'>
                            📁 Create folders and move bookmarks.
                        </h3>
                        <div className='div-img-help-wrapper'>
                            <img className="img-help" src={seeulater_folder} alt="seeULater_folder" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-wrapper">
                <div>
                    <Link to="/register">
                        <button className="button-main-regist">Quick Register</button>
                    </Link>
                    <h3 className='h3-register-desc'>
                        You only need an ID and password to sign up!
                    </h3>
                </div>
                <h1>Log In</h1>
                <form className="login-form" onSubmit={onSubmitLogin}>
                    <label>
                        <p>ID</p>
                        <input type="text" onChange={e => setuserUniqueID(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div className="login-button">
                        <button type="submit" className="button-login">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.ProTypes = {
    setToken: ProTypes.func.isRequired
}