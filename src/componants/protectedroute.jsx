import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const userRole = localStorage.getItem("role"); // Récupérer le rôle de l'utilisateur depuis le localStorage

    if (userRole !== role) {
        return <Navigate to="/" />; // Redirige vers la page d'accueil si l'utilisateur n'est pas autorisé
    }

    return children;
}