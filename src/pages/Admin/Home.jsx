import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css"; // Import des styles spécifiques

export default function Home() {
    return (
        <div className="admin-home-container">
            <h1>Bienvenue sur le tableau de bord administrateur</h1>
            <p>Utilisez les liens ci-dessous pour gérer les différentes sections :</p>

            <div className="admin-links">
                <Link to="/admin/eleves" className="admin-link">
                    Gérer les élèves
                </Link>
                <Link to="/admin/classes" className="admin-link">
                    Gérer les classes
                </Link>
                <Link to="/admin/filieres" className="admin-link">
                    Gérer les filières
                </Link>
                <Link to="/admin/cours" className="admin-link">
                    Gérer les cours
                </Link>
                <Link to="/admin/sessions" className="admin-link">
                    Gérer les sessions
                </Link>
            </div>
        </div>
    );
}