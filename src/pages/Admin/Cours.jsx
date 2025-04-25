import React, { useEffect, useState } from "react";
import { fetchCours, addCours, updateCours, deleteCours } from "../../utils/api"; // Import des fonctions API

export default function Cours() {
    const [cours, setCours] = useState([]);
    const [newCours, setNewCours] = useState({ matiere: "", profId: "", date: "", heure: "", duree: "", salle: "" });
    const [editingCours, setEditingCours] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCours(); // Récupération des cours via l'API
                setCours(data);
            } catch (err) {
                setError("Erreur lors de la récupération des cours.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCours = async () => {
        if (!newCours.matiere.trim()) return;

        try {
            const addedCours = await addCours(newCours);
            setCours([...cours, addedCours]);
            setNewCours({ matiere: "", profId: "", date: "", heure: "", duree: "", salle: "" });
        } catch (err) {
            setError("Erreur lors de l'ajout du cours.");
            console.error(err);
        }
    };

    const handleUpdateCours = async (id, updatedCours) => {
        try {
            const updated = await updateCours(id, updatedCours);
            setCours(cours.map((cour) => (cour.id === id ? updated : cour)));
            setEditingCours(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour du cours.");
            console.error(err);
        }
    };

    const handleDeleteCours = async (id) => {
        try {
            await deleteCours(id);
            setCours(cours.filter((cour) => cour.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression du cours.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des cours...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="cours-container">
            <h1>Gestion des Cours</h1>

            <div className="add-cours-form">
                <input
                    type="text"
                    placeholder="Matière"
                    value={newCours.matiere}
                    onChange={(e) => setNewCours({ ...newCours, matiere: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID du professeur"
                    value={newCours.profId}
                    onChange={(e) => setNewCours({ ...newCours, profId: e.target.value })}
                />
                <input
                    type="date"
                    value={newCours.date}
                    onChange={(e) => setNewCours({ ...newCours, date: e.target.value })}
                />
                <input
                    type="time"
                    value={newCours.heure}
                    onChange={(e) => setNewCours({ ...newCours, heure: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Durée"
                    value={newCours.duree}
                    onChange={(e) => setNewCours({ ...newCours, duree: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Salle"
                    value={newCours.salle}
                    onChange={(e) => setNewCours({ ...newCours, salle: e.target.value })}
                />
                <button onClick={handleAddCours}>Ajouter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Matière</th>
                        <th>Professeur</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Durée</th>
                        <th>Salle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cours.map((cour) => (
                        <tr key={cour.id}>
                            <td>{cour.id}</td>
                            <td>
                                {editingCours === cour.id ? (
                                    <input
                                        type="text"
                                        defaultValue={cour.matiere}
                                        onBlur={(e) => handleUpdateCours(cour.id, { ...cour, matiere: e.target.value })}
                                    />
                                ) : (
                                    cour.matiere
                                )}
                            </td>
                            <td>{cour.profId}</td>
                            <td>{cour.date}</td>
                            <td>{cour.heure}</td>
                            <td>{cour.duree}</td>
                            <td>{cour.salle}</td>
                            <td>
                                <button onClick={() => setEditingCours(cour.id)}>Modifier</button>
                                <button onClick={() => handleDeleteCours(cour.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}