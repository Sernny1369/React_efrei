import React, { useEffect, useState } from "react";

export default function Planning() {
    const [cours, setCours] = useState([]);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchPlanning = async () => {
            try {
                const response = await fetch("http://localhost:5000/planning", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCours(data);
                } else {
                    const errorData = await response.json();
                    setMessage(errorData.error);
                }
            } catch (err) {
                setMessage("Erreur réseau. Veuillez réessayer.");
            }
        };

        fetchPlanning();
    }, [token]);

    return (
        <div>
            <h1>Planning des cours</h1>
            {message && <p style={{ color: "red" }}>{message}</p>}
            {cours.length > 0 ? (
                cours.map((cour, index) => (
                    <div key={index} className="cours">
                        <h2>{cour.matiere}</h2>
                        <p><strong>Date :</strong> {cour.date}</p>
                        <p><strong>Heure :</strong> {cour.heure}</p>
                        <p><strong>Durée :</strong> {cour.duree}</p>
                        <p><strong>Salle :</strong> {cour.salle}</p>
                        <p><strong>Description :</strong> {cour.description}</p>
                        <h3>Élèves :</h3>
                        <ul>
                            {cour.students.map(student => (
                                <li key={student.id}>
                                    {student.nom} - Note : {student.note}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Aucun cours à afficher.</p>
            )}
        </div>
    );
}