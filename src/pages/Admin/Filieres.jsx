import React, { useEffect, useState } from "react";
import { fetchFilieres, addFiliere, updateFiliere, deleteFiliere } from "../../utils/api"; // Import des fonctions API

export default function Filieres() {
    const [filieres, setFilieres] = useState([]);
    const [newFiliere, setNewFiliere] = useState({ nom: "" });
    const [editingFiliere, setEditingFiliere] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFilieres(); // Récupération des filières via l'API
                setFilieres(data);
            } catch (err) {
                setError("Erreur lors de la récupération des filières.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddFiliere = async () => {
        if (!newFiliere.nom.trim()) return;

        try {
            const addedFiliere = await addFiliere(newFiliere);
            setFilieres([...filieres, addedFiliere]);
            setNewFiliere({ nom: "" });
        } catch (err) {
            setError("Erreur lors de l'ajout de la filière.");
            console.error(err);
        }
    };

    const handleUpdateFiliere = async (id, updatedFiliere) => {
        try {
            const updated = await updateFiliere(id, updatedFiliere);
            setFilieres(filieres.map((filiere) => (filiere.id === id ? updated : filiere)));
            setEditingFiliere(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour de la filière.");
            console.error(err);
        }
    };

    const handleDeleteFiliere = async (id) => {
        try {
            await deleteFiliere(id);
            setFilieres(filieres.filter((filiere) => filiere.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression de la filière.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des filières...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="filieres-container">
            <h1>Gestion des Filières</h1>

            <div className="add-filiere-form">
                <input
                    type="text"
                    placeholder="Nom de la filière"
                    value={newFiliere.nom}
                    onChange={(e) => setNewFiliere({ nom: e.target.value })}
                />
                <button onClick={handleAddFiliere}>Ajouter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filieres.map((filiere) => (
                        <tr key={filiere.id}>
                            <td>{filiere.id}</td>
                            <td>
                                {editingFiliere === filiere.id ? (
                                    <input
                                        type="text"
                                        defaultValue={filiere.nom}
                                        onBlur={(e) => handleUpdateFiliere(filiere.id, { nom: e.target.value })}
                                    />
                                ) : (
                                    filiere.nom
                                )}
                            </td>
                            <td>
                                <button onClick={() => setEditingFiliere(filiere.id)}>Modifier</button>
                                <button onClick={() => handleDeleteFiliere(filiere.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}