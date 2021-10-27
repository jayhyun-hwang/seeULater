import React, { useState } from 'react';
import ProTypes from 'prop-types';
import "./Login.css";
import define from "../../define/define"
import Axios from "axios";
import {Link} from 'react-router-dom';

async function loginUser(credentials) {
    return Axios.post(define.REQURL + "/login", {
        credentials
    }).then()
}

export default function Login({ setToken }) {
    const [userID, setUserID] = useState();
    const [password, setPassword] = useState();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            userID,
            password
        });
        setToken(token.data);
        window.location.replace("/");
    }
    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form className="login-form" onSubmit={handlerSubmit}>
                <label>
                    <p>ID</p>
                    <input type="text" onChange={e => setUserID(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div className="login-button">
                    <button type="submit" className="button-login">Log In</button>
                    <Link to="/register">
                        <button type="submit" className="button-regist">Register</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

Login.ProTypes = {
    setToken: ProTypes.func.isRequired
}