import { useState } from "react";
import { useCookies } from "react-cookie";

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        //토큰이 있다면 반환
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());
    //access, refresh
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));

        let expires = new Date();
        expires.setTime(expires.getTime() + userToken.expire);
        setCookie('token', userToken.token, { path: '/', expires })
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}