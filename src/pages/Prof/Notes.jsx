import React, { useEffect, useState } from "react";
import { fetchNotes } from "../../utils/api"; // Assure-toi que cette fonction existe et renvoie la liste des notes

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des notes.");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  if (loading) {
    return <p>Chargement des notes...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="notes-container">
      <h1>Liste des Notes</h1>
      <table>
        <thead>
          <tr>
            <th>Élève (ID)</th>
            <th>Cours (ID)</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, idx) => (
            <tr key={note.id ?? idx}>
              <td>{note.eleveId}</td>
              <td>{note.coursId}</td>
              <td>{note.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
