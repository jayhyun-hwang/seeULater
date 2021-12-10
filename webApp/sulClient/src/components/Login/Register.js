import React, { useState } from 'react';
import "./Login.css";
import define from "../../define/define"
import Axios from "axios";
import {Link} from 'react-router-dom';

async function loginUser(credentials) {
    return Axios.post(define.URL + "/login", {
        credentials
    }).then()
}

export default function Register() {
    
    const [userID, setUserID] = useState();
    const [password, setPassword] = useState();
    const [IDValid, setIdValid] = useState(false);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            userID,
            password
        });
        window.location.replace("/");
    }
    return (
        <div className="login-wrapper">
            <h1>Register User</h1>
            <form className="login-form" onSubmit={handlerSubmit}>
                <label>
                    <p>ID</p>
                    <input type="text" className="input-register" placeholder="6 ~ 20 characters" onChange={e => setUserID(e.target.value)} />
                </label>
                <div className="div-duplicatecheck">
                <button type="submit" className="button-duplicatecheck">Duplicate Check</button>
                </div>
                <label>
                    <p>Password</p>
                    <input type="password" className="input-register" placeholder="4 ~ 13 characters" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>Check Password</p>
                    <input type="password" className="input-register" placeholder="rewrite password" onChange={e => setPassword(e.target.value)} />
                </label>
                <br/>
                <label>
                    <p>E-mail(Optional)</p>
                    <input type="password" className="input-register" placeholder="email@address.com" onChange={e => setPassword(e.target.value)} />
                </label>
                <div className="login-button">
                    <button type="submit" className="button-login">Register</button>
                    <Link to="/">
                        <button type="submit" className="button-regist">Go back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
    // return (
    //     <div>
    //         <h1>register here</h1>
    //     </div>
    // )
}
