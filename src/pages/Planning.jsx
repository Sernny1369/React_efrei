import React from 'react';
import Planning from '../componants/planning/planning';
import { useEffect, useState } from "react";

export default function Plan() {
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:5000/planning")
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch((err) => console.error("Erreur:", err));
    }, []);
    return (
    <>
        <Planning />
        <p className="mt-2 text-gray-600">Message du backend : {message || "Chargement..."}</p>
    </>
    )
}