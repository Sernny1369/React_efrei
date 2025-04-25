
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const userRole = localStorage.getItem("role");

    return (
        <>
            <nav className="header">
                <ul className="flex justify-between items-center p-4 bg-gray-100">
                    <li><Link to="/home_log">Home</Link></li>
                    {userRole === "admin" && (
                        <>
                            <li><Link to="/admin/eleves">Gérer les élèves</Link></li>
                            <li><Link to="/admin/filiere">Gérer les filières</Link></li>
                            <li><Link to="/admin/classes">Gérer les classes</Link></li>
                            <li><Link to="/admin/profs">Gérer les professeurs</Link></li>
                            <li><Link to="/admin/cours">Gérer les cours</Link></li>
                        </>
                    )}
                    {userRole === "prof" && (
                        <>
                            <li><Link to="/prof/notes">Gérer les notes</Link></li>
                            <li><Link to="/prof/cours">Consulter les cours</Link></li>
                        </>
                    )}
                    {userRole === "student" && (
                        <>
                            <li><Link to="/student/cours">Mes cours</Link></li>
                            <li><Link to="/student/notes">Mes notes</Link></li>
                        </>
                    )}
                    {token && (
                        <li>
                            <button onClick={handleLogout} className="logout-button">
                                Déconnexion
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}
