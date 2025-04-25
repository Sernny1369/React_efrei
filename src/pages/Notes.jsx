import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../utils/api'; // Import de la fonction API
import '../styles/Notes.css'
export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotes(); // Récupération des notes via l'API
                setNotes(data);
            } catch (err) {
                setError("Erreur lors de la récupération des notes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement des notes...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <>
            <h1>Mes Notes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Matière</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={index}>
                            <td>{note.matiere}</td>
                            <td>{note.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}