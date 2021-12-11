import LogoAlligator from '../img/alligator.png';
import Logout from '../img/logout.png';
import "./CommonHeader.css";

// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;

// const displayMode = () => {
//   if (argMode) {
//     return (
//       <h1>{argMode}</h1>
//     )
//   }
// };

function CommonHeader() {
    const handlerClick = () => {
        window.location.href = "/";
    }
    const logoutClick = () => {
        // todo
        // post token to black list
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    return (
        <div className="common-header-div">
            <header className="common-header">
                <div onClick={handlerClick}>
                    {argMode} seeULater&nbsp;
                    <img id="home-img" src={LogoAlligator} alt="seeULater"/>
                </div>
                <div id="logout-div" onClick={logoutClick}>
                    Logout&nbsp;
                    <img id="logout-img" src={Logout} alt="logout"/>
                </div>
            </header>
        </div>
    );
}

export default CommonHeader;