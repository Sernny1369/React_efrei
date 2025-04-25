import React, { useEffect, useState } from "react";
import { fetchEleves, addEleve, updateEleve, deleteEleve } from "../../utils/api"; // Import des fonctions API

export default function Eleves() {
    const [eleves, setEleves] = useState([]);
    const [newEleve, setNewEleve] = useState({ nom: "", prenom: "", email: "", classe: "" });
    const [editingEleve, setEditingEleve] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEleves(); // Récupération des élèves via l'API
                setEleves(data);
            } catch (err) {
                setError("Erreur lors de la récupération des élèves.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddEleve = async () => {
        if (!newEleve.nom.trim() || !newEleve.prenom.trim() || !newEleve.email.trim()) return;

        try {
            const addedEleve = await addEleve(newEleve);
            setEleves([...eleves, addedEleve]);
            setNewEleve({ nom: "", prenom: "", email: "", classe: "" });
        } catch (err) {
            setError("Erreur lors de l'ajout de l'élève.");
            console.error(err);
        }
    };

    const handleUpdateEleve = async (id, updatedEleve) => {
        try {
            const updated = await updateEleve(id, updatedEleve);
            setEleves(eleves.map((eleve) => (eleve.id === id ? updated : eleve)));
            setEditingEleve(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour de l'élève.");
            console.error(err);
        }
    };

    const handleDeleteEleve = async (id) => {
        try {
            await deleteEleve(id);
            setEleves(eleves.filter((eleve) => eleve.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression de l'élève.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des élèves...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="eleves-container">
            <h1>Gestion des Élèves</h1>

            <div className="add-eleve-form">
                <input
                    type="text"
                    placeholder="Nom"
                    value={newEleve.nom}
                    onChange={(e) => setNewEleve({ ...newEleve, nom: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Prénom"
                    value={newEleve.prenom}
                    onChange={(e) => setNewEleve({ ...newEleve, prenom: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEleve.email}
                    onChange={(e) => setNewEleve({ ...newEleve, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Classe"
                    value={newEleve.classe}
                    onChange={(e) => setNewEleve({ ...newEleve, classe: e.target.value })}
                />
                <button onClick={handleAddEleve}>Ajouter</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Classe</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {eleves.map((eleve) => (
                        <tr key={eleve.id}>
                            <td>{eleve.id}</td>
                            <td>
                                {editingEleve === eleve.id ? (
                                    <input
                                        type="text"
                                        defaultValue={eleve.nom}
                                        onBlur={(e) => handleUpdateEleve(eleve.id, { ...eleve, nom: e.target.value })}
                                    />
                                ) : (
                                    eleve.nom
                                )}
                            </td>
                            <td>{eleve.prenom}</td>
                            <td>{eleve.email}</td>
                            <td>{eleve.classe}</td>
                            <td>
                                <button onClick={() => setEditingEleve(eleve.id)}>Modifier</button>
                                <button onClick={() => handleDeleteEleve(eleve.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}