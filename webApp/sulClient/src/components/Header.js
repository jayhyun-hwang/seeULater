// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LogoAlligator from './img/alligator.png';

function Header() {
    const handlerClick = () => {
        window.location.href="/";
    }
    return (
        <header>
            <div className="main-header" onClick={handlerClick}>
                <h1>seeULater</h1><img className="main-logo-img" src={LogoAlligator} alt="seeULater" />
            </div>
        </header>
        // <Router>
        //     <Link to="/App">
        //     </Link>
        //     <Route path="/App" />
        // </Router >
        // <button type="button" onClick={handleClick}>
        //   Go home
        // </button>
    );
}

{/* <Menu>
   <MenuItem component={Link} to={'/first'}>Team 1</MenuItem>
   <MenuItem component={Link} to={'/second'}>Team 2</MenuItem>
</Menu> */}

export default Header;