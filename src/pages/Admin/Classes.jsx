import React, { useEffect, useState } from "react";
import { fetchClasses, addClass, updateClass, deleteClass } from "../../utils/api"; // Import des fonctions API
import "../../styles/Classes.css"; // Import des styles spécifiques

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [newClassName, setNewClassName] = useState("");
    const [editingClass, setEditingClass] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClasses(); // Récupération des classes via l'API
                setClasses(data);
            } catch (err) {
                setError("Erreur lors de la récupération des classes.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddClass = async () => {
        if (!newClassName.trim()) return;

        try {
            const newClass = await addClass({ nom: newClassName });
            setClasses([...classes, newClass]);
            setNewClassName("");
        } catch (err) {
            setError("Erreur lors de l'ajout de la classe.");
            console.error(err);
        }
    };

    const handleUpdateClass = async (id, updatedName) => {
        try {
            const updatedClass = await updateClass(id, { nom: updatedName });
            setClasses(classes.map((classe) => (classe.id === id ? updatedClass : classe)));
            setEditingClass(null);
        } catch (err) {
            setError("Erreur lors de la mise à jour de la classe.");
            console.error(err);
        }
    };

    const handleDeleteClass = async (id) => {
        try {
            await deleteClass(id);
            setClasses(classes.filter((classe) => classe.id !== id));
        } catch (err) {
            setError("Erreur lors de la suppression de la classe.");
            console.error(err);
        }
    };

    if (loading) {
        return <p>Chargement des classes...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="classes-container">
            <h1>Gestion des Classes</h1>

            <div className="add-class-form">
                <input
                    type="text"
                    placeholder="Nom de la nouvelle classe"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                />
                <button onClick={handleAddClass}>Ajouter</button>
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
                    {classes.map((classe) => (
                        <tr key={classe.id}>
                            <td>{classe.id}</td>
                            <td>
                                {editingClass === classe.id ? (
                                    <input
                                        type="text"
                                        defaultValue={classe.nom}
                                        onBlur={(e) => handleUpdateClass(classe.id, e.target.value)}
                                    />
                                ) : (
                                    classe.nom
                                )}
                            </td>
                            <td>
                                <button onClick={() => setEditingClass(classe.id)}>Modifier</button>
                                <button onClick={() => handleDeleteClass(classe.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}