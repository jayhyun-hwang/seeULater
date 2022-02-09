import React, { useState } from 'react';
import ProTypes from 'prop-types';
import "./Login.css";
import define from "../../define/define"
import Axios from "axios";
import { Link } from 'react-router-dom';

async function smsLoginUser(loginInfo) {
    return Axios.post(define.URL + "/login", {
        loginInfo
    }).then()
}

export default function Login2({ setToken }) {
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
            window.location.replace("/");
        } else {
            alert(res.data);
        }
    }
    return (
        <div className="login-wrapper">
            <h1>Log In 2222</h1>
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
                    <Link to="/register">
                        <button type="submit" className="button-regist">Quick Register</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

Login2.ProTypes = {
    setToken: ProTypes.func.isRequired
}