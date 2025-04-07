import React from 'react';
import { useEffect, useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/hello")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error("Erreur:", err));
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