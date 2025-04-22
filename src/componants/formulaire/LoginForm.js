import React from 'react';
import '../../styles/LoginForm.css';

export default function ConnexionForm() {
    return (
        <>
            <form className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" required />
                    <small id="emailHelp" className="form-text text-muted">Nous ne partagerons jamais votre email avec qui que ce soit.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Mot de passe" required />
                </div>

                <div>identifiant oublié ?</div>
                <div>
                En me connectant, j'accepte les conditions d'utilisations du service SSO Efrei notamment en matière de données personnelles.
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </>
    )
};
