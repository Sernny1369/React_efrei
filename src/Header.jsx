import './header.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprime le token du localStorage
        localStorage.removeItem("token");
        // Redirige vers la page de connexion
        navigate("/login");
    };

    return (
        <>
            <nav className="header">
                <ul className="flex justify-between items-center p-4 bg-gray-100">
                    <li><Link to="/home_log">Home</Link></li>
                    <li><Link to="/plan">Planning</Link></li>
                    <li><Link to="/notes">Notes</Link></li>
                    <li><Link to="/account">Mon compte</Link></li>
                    {token &&(
                    <li>                        
                        <button onClick={handleLogout} className="logout-button">
                        Déconnexion
                    </button></li>
                    )}
                </ul>
            </nav>
        </>
    )
}
