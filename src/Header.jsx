import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <nav className="header">
                <ul className="flex justify-between items-center p-4 bg-gray-100">
                    <li><Link to="/home_log">Home</Link></li>
                    <li><Link to="/plan">Planning</Link></li>
                    <li><Link to="/notes">Notes</Link></li>
                    <li><Link to="/account">Mon compte</Link></li>
                    <li><Link to="/login">Connexion</Link></li>
                </ul>
            </nav>
        </>
    )
}
