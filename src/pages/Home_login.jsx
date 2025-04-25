import React from 'react';
import { useEffect, useState } from "react";
import { fetchHelloMessage} from "../utils/api";

export default function HomeLog() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const data = await fetchHelloMessage(); // Utilisation de la fonction API
                setMessage(data.message);
            } catch (err) {
                console.error("Erreur:", err);
            }
        };

        fetchMessage();
    }, []);

    return (
    <>
        <h1>Bienvenue</h1>

        <h2>Sur la plateforme web de l'efei</h2>
        <p>Retrouver l'ensemble de vos services sur myEfrei</p>
        <p className="mt-2 text-gray-600">Message du backend : {message || "Chargement..."}</p>
    </>
    )
}