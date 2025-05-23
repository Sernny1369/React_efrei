import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/LoginForm.css';
import { login } from '../../utils/api';

export default function ConnexionForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(email, password); // Utilisation de la fonction API
            localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
            localStorage.setItem("role", data.user.role); // Stocker le rôle de l'utilisateur
            alert(`Bienvenue, ${data.user.email}`);
            navigate("/home_log");
        } catch (err) {
            setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
        }
    };
    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
                    placeholder="Entrez votre email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" 
                    placeholder="Mot de passe" required value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <div className="error">{error}</div>}
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </>
    )
};
