import React, { useEffect, useState } from "react";
import { fetchCours } from "../../utils/api"; // Import de la fonction API pour récupérer les cours

export default function Cours() {
    const [cours, setCours] = useState([]);
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

    if (loading) {
        return <p>Chargement des cours...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="cours-container">
            <h1>Liste des Cours</h1>

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
                    </tr>
                </thead>
                <tbody>
                    {cours.map((cour) => (
                        <tr key={cour.id}>
                            <td>{cour.id}</td>
                            <td>{cour.matiere}</td>
                            <td>{cour.profId}</td>
                            <td>{cour.date}</td>
                            <td>{cour.heure}</td>
                            <td>{cour.duree}</td>
                            <td>{cour.salle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
