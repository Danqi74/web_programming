import './Header.css';
import '../../images/Pony_logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authOperations';

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getUserEmail = () => {
        return localStorage.getItem('email') || 'Guest';
    };
    return(
        <header className="header">
        <img src={require('../../images/Pony_logo.png')} alt="My Little Pony: Friendship Is Magic" className="logo" />
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/cart">Cart</a></li>
                <li>
                        <div className="logout" onClick={handleLogout}>
                            {getUserEmail()}
                            <div className="tooltip">Log out?</div>
                        </div>
                    </li>
            </ul>
        </nav>
    </header>
    );
}

export default Header