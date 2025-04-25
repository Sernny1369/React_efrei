import React, { useEffect, useState } from "react";
import { fetchProfs, addProf, updateProf, deleteProf } from "../../utils/api"; // Import des fonctions API

export default function Prof() {
    const [profs, setProfs] = useState([]);
    const [newProf, setNewProf] = useState({ nom: "", prenom: "", email: "" });
    const [editingProf, setEditingProf] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProfs(); // Récupération des professeurs via l'API
                setProfs(data);
            } catch (err) {
                setError("Erreur lors de la récupération des professeurs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddProf = async () => {
        if (!newProf.nom.trim() || !newProf.prenom.trim() || !newProf.email.trim()) return;

        try {
            const addedProf = await addProf(newProf);
            setProfs([...profs, addedProf]);
            setNewProf({ nom: "", prenom: "", email: "" });
        } catch (err) {
            setError("Erreur lors de l'ajout du professeur.");
            console.error(err);
        }
    };

    const handleUpdateProf = async (id, updatedProf) => {
        try {
            const updated = await updateProf(id, updatedProf);
            setProfs(profs.map((prof) => (prof.id === id ? updated : prof)));
            setEditingProf(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour du professeur.");
            console.error(err);
        }
    };

    const handleDeleteProf = async (id) => {
        try {
            await deleteProf(id);
            setProfs(profs.filter((prof) => prof.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression du professeur.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des professeurs...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="profs-container">
            <h1>Gestion des Professeurs</h1>

            <div className="add-prof-form">
                <input
                    type="text"
                    placeholder="Nom"
                    value={newProf.nom}
                    onChange={(e) => setNewProf({ ...newProf, nom: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Prénom"
                    value={newProf.prenom}
                    onChange={(e) => setNewProf({ ...newProf, prenom: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newProf.email}
                    onChange={(e) => setNewProf({ ...newProf, email: e.target.value })}
                />
                <button onClick={handleAddProf}>Ajouter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {profs.map((prof) => (
                        <tr key={prof.id}>
                            <td>{prof.id}</td>
                            <td>
                                {editingProf === prof.id ? (
                                    <input
                                        type="text"
                                        defaultValue={prof.nom}
                                        onBlur={(e) => handleUpdateProf(prof.id, { ...prof, nom: e.target.value })}
                                    />
                                ) : (
                                    prof.nom
                                )}
                            </td>
                            <td>{prof.prenom}</td>
                            <td>{prof.email}</td>
                            <td>
                                <button onClick={() => setEditingProf(prof.id)}>Modifier</button>
                                <button onClick={() => handleDeleteProf(prof.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}