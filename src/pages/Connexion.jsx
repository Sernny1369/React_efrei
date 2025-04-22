import React from 'react';
import ConnexionForm from '../componants/formulaire/LoginForm';

export default function Connexion() {
    return (
        <>
            <div className="container">
                <div className="image-container">
                    <img src="/My_Efrei_logo.png" alt="Logo Efrei" className="image-left" />
                </div>
                <div className="content-container">
                    <h1>Connexion</h1>
                    <h2>utilise votre compte Efrei</h2>
                    <ConnexionForm />
                </div>
            </div>
        </>
    );
}