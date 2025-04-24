import React, { useState } from "react";

export default function AddCoursForm() {
    const [matiere, setMatiere] = useState("");
    const [date, setDate] = useState("");
    const [heure, setHeure] = useState("");
    const [duree, setDuree] = useState("");
    const [salle, setSalle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/add-cours", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ matiere, date, heure, duree, salle, description })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                // Réinitialiser le formulaire
                setMatiere("");
                setDate("");
                setHeure("");
                setDuree("");
                setSalle("");
                setDescription("");
            } else {
                const errorData = await response.json();
                setMessage(errorData.error);
            }
        } catch (err) {
            setMessage("Erreur réseau. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un cours</h2>
            {message && <p style={{ color: "red" }}>{message}</p>}
            <div>
                <label>Matière :</label>
                <input
                    type="text"
                    value={matiere}
                    onChange={(e) => setMatiere(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date :</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Heure :</label>
                <input
                    type="time"
                    value={heure}
                    onChange={(e) => setHeure(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Durée :</label>
                <input
                    type="text"
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Salle :</label>
                <input
                    type="text"
                    value={salle}
                    onChange={(e) => setSalle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description :</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Ajouter le cours</button>
        </form>
    );
}    