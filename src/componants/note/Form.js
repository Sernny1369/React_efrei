import React, { useState } from 'react';

export default function NoteForm() {
    const [eleveId, setEleveId] = useState("");
    const [note, setNote] = useState("");
    const [matiere, setMatiere] = useState("");
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/add-note", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ eleveId: parseInt(eleveId), note: parseFloat(note), matiere })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
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
            <div>
                <label>ID de l'élève :</label>
                <input
                    type="number"
                    value={eleveId}
                    onChange={(e) => setEleveId(e.target.value)}
                    required
                />
            </div>
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
                <label>Note :</label>
                <input
                    type="number"
                    step="0.1"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Ajouter la note</button>
            {message && <p>{message}</p>}
        </form>
    );
}