import React, { useEffect, useState } from 'react';

export default function Account() {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token"); // Récupérer le token pour l'authentification

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/account", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Envoyer le token dans les en-têtes
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error("Erreur lors de la récupération des données utilisateur");
                }
            } catch (err) {
                console.error("Erreur réseau :", err);
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
