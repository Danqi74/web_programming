import './Header.css';
import '../../images/Pony_logo.png'

function Header(){
    return(
        <header className="header">
        <img src={require('../../images/Pony_logo.png')} alt="My Little Pony: Friendship Is Magic" className="logo" />
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header