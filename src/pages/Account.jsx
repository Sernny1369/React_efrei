import React, { useEffect, useState } from 'react';
import { fetchUserAccount } from '../utils/api'; // Import de la fonction API


export default function Account() {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token"); // Récupérer le token pour l'authentification

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await fetchUserAccount(token); // Utilisation de la fonction API
                setUser(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des données utilisateur :", err);
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <>
            <h1>Mon compte</h1>
            <h2>Mes infos</h2>
            <h3>Nom : {user.nom || "Non disponible"}</h3>
            <h3>Prénom : {user.prenom || "Non disponible"}</h3>
            <h3>Email : {user.email || "Non disponible"}</h3>
        </>
    )
};
