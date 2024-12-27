import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

import './Header.css';

const Header = () => {

    let navigate = useNavigate()
    const onClickLogout = ()=> {
        Cookies.remove("jwtToken")
        navigate("/auth")
    };

    return (
        <nav className='navbar-container'>
            <div className='navbar-content'>
                <div>
                    <Link to="/" className='link-item'>
                        <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' className='website-logo'></img>
                    </Link>
                </div>
                <ul className="header-list-items">
                    <Link to="/" className="link-item">
                        <li className="home-heading home">Home</li>
                    </Link>
                    <Link to="/jobs" className="link-item">
                        <li className="job-heading home">Jobs</li>
                    </Link>
                </ul>
                <div>
                    <button type="button" className="logout-button" onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header;