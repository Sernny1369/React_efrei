import elevesList from './eleves.js';

// Utilisation des données importées


export default function Home() {
    return (
        <>
            <div>
                <h1>Liste des élèves</h1>
                <ul>
                    {elevesList.map((eleve, index) => (
                        <li key={index}>
                            {eleve.prenom} {eleve.nom}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}