import { useEffect, useState } from "react";

export default function Planning() {
    const [planning, setPlanning] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/planning")
            .then((res) => res.json())
            .then((data) => setPlanning(data.planning))
            .catch((err) => console.error("Erreur:", err));
    }, []);

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">Planning</h1>
            <p className="mt-2 text-gray-600">{planning || "Chargement..."}</p>
        </div>
    );
}
