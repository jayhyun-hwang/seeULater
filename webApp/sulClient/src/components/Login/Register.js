import React, { useState, useEffect } from 'react';
import "./Login.css";
import define from "../../define/define"
import Axios from "axios";
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

async function smsRegisterUser(userInfo) {
    return Axios.post(define.URL + "/register/user", {
        userInfo
    }).then((response) => {
        // console.log(response);
        return response;
    }).catch((error) => {
        return error.response;
    });
}

async function smsCheckDuplicateID(userUniqueID) {
    return Axios.post(define.URL + "/checkDuplicateID", {
        userUniqueID
    }).then((response) => {
        if (response.data.count === 0) {
            return true;
        }
        return false;
    }).catch((err) => {
        return err;
    });
}

export default function Register() {

    const [userUniqueID, setuserUniqueID] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [IDValid, setIDValid] = useState(false);

    //아이디가 바뀔 때 마다 valid 여부 초기화
    useEffect(() => {
        setIDValid(false);
    }, [userUniqueID]);

    const IDOnChange = (e) => {
        if (e.target.value === '') {
            setuserUniqueID(e.target.value);
            return
        }
        const re = /^[A-Za-z0-9-_]+$/;
        if (re.test(e.target.value)) {
            setuserUniqueID(e.target.value);
        } else {
            alert("Only letters, numbers, - and _ are allowed.")
        }
    }
    const onClickCheckDuplicateID = async (e) => {
        e.preventDefault();
        if (IDValid) {
            return;
        }
        if (!userUniqueID || userUniqueID.length < 4) {
            alert("Please enter more than 4 characters.");
            return;
        }
        const isValid = await smsCheckDuplicateID(userUniqueID);
        setIDValid(isValid);
        if (!isValid) {
            alert("This ID already exists. Please use another ID.");
        }
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        // check id
        if (IDValid === false) {
            alert("Please Check your ID.\nClick [Check ID] button.");
            return;
        }
        // check password
        // check length
        if (!password || password.length < 4) {
            alert("Please enter passwords more than 4 characters.");
            return;
        }
        // cherck match
        if (password !== rePassword) {
            alert("Passwords do not match.\nPlease enter the same password twice.");
            return;
        }
        const res = await smsRegisterUser({
            userUniqueID: userUniqueID,
            password,
            email
        });

        //show result alert
        //go to main
        alert(res.data);
        if (res.status === 200) {
            window.location.replace("/");
        }
    }
    return (
        <div className="login-wrapper">
            <h1>Register User</h1>
            <form className="login-form" onSubmit={handlerSubmit}>
                <label>
                    <p>ID
                        <i
                            id="ID-Exclamation"
                            class="fa fa-exclamation-circle"
                            aria-hidden="true"
                            data-tip
                            data-for="IDTooltip"
                        >
                        </i>
                    </p>
                    <ReactTooltip id="IDTooltip" place="right" effect="solid">
                        <span>User ID must contain 4 to 20 characters.<br />Only letters, numbers, - and _ are allowed.</span>
                    </ReactTooltip>
                    <input type="text"
                        className="input-register"
                        placeholder="4 ~ 20 characters"
                        data-tip="User ID must contain 4 to 20 characters. Only letters, numbers, - and _ are allowed."
                        maxLength="20"
                        value={userUniqueID}
                        autoFocus
                        onChange={e => IDOnChange(e)} />
                </label>
                <div className="div-checkduplicate">
                    <button
                        className={IDValid ?
                            "button-checkduplicate-true" : "button-checkduplicate-false"}
                        onClick={onClickCheckDuplicateID}
                        data-tip
                        data-for="CheckTooltip"
                    >
                        Check ID
                    </button>
                    <ReactTooltip id="CheckTooltip" place="right" effect="solid"
                        disable={IDValid ? false : true}
                    >
                        You can use this ID.
                    </ReactTooltip>
                </div>
                <label>
                    <p>Password</p>
                    <input type="password"
                        className="input-register"
                        placeholder="4 ~ 20 characters"
                        maxLength="20"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>Check Password</p>
                    <input type="password"
                        className="input-register"
                        autoComplete="new-password"
                        placeholder="rewrite password"
                        maxLength="20"
                        autoComplete="new-password"
                        onChange={e => setRePassword(e.target.value)} />
                </label>
                <br />
                <label>
                    <p>E-mail(Optional)</p>
                    <input type="email"
                        className="input-register"
                        placeholder="email@address.com"
                        maxLength="255"
                        onChange={e => setEmail(e.target.value)} />
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
}
