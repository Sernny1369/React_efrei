import React, { useEffect, useState } from "react";
import { fetchSessions, addSession, updateSession, deleteSession } from "../../utils/api"; // Import des fonctions API

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({ nom: "", dateDebut: "", dateFin: "" });
    const [editingSession, setEditingSession] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSessions(); // Récupération des sessions via l'API
                setSessions(data);
            } catch (err) {
                setError("Erreur lors de la récupération des sessions.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddSession = async () => {
        if (!newSession.nom.trim() || !newSession.dateDebut || !newSession.dateFin) return;

        try {
            const addedSession = await addSession(newSession);
            setSessions([...sessions, addedSession]);
            setNewSession({ nom: "", dateDebut: "", dateFin: "" });
        } catch (err) {
            setError("Erreur lors de l'ajout de la session.");
            console.error(err);
        }
    };

    const handleUpdateSession = async (id, updatedSession) => {
        try {
            const updated = await updateSession(id, updatedSession);
            setSessions(sessions.map((session) => (session.id === id ? updated : session)));
            setEditingSession(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour de la session.");
            console.error(err);
        }
    };

    const handleDeleteSession = async (id) => {
        try {
            await deleteSession(id);
            setSessions(sessions.filter((session) => session.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression de la session.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des sessions...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="sessions-container">
            <h1>Gestion des Sessions</h1>

            <div className="add-session-form">
                <input
                    type="text"
                    placeholder="Nom de la session"
                    value={newSession.nom}
                    onChange={(e) => setNewSession({ ...newSession, nom: e.target.value })}
                />
                <input
                    type="date"
                    value={newSession.dateDebut}
                    onChange={(e) => setNewSession({ ...newSession, dateDebut: e.target.value })}
                />
                <input
                    type="date"
                    value={newSession.dateFin}
                    onChange={(e) => setNewSession({ ...newSession, dateFin: e.target.value })}
                />
                <button onClick={handleAddSession}>Ajouter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session) => (
                        <tr key={session.id}>
                            <td>{session.id}</td>
                            <td>
                                {editingSession === session.id ? (
                                    <input
                                        type="text"
                                        defaultValue={session.nom}
                                        onBlur={(e) =>
                                            handleUpdateSession(session.id, { ...session, nom: e.target.value })
                                        }
                                    />
                                ) : (
                                    session.nom
                                )}
                            </td>
                            <td>{session.dateDebut}</td>
                            <td>{session.dateFin}</td>
                            <td>
                                <button onClick={() => setEditingSession(session.id)}>Modifier</button>
                                <button onClick={() => handleDeleteSession(session.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}