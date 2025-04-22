import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <div className="image-container">
                <img src="/My_Efrei_logo.png" alt="Logo Efrei" className="image-left" />
            </div>
            <div className="content-container">
                <h1>
                    <div>
                        Bienvenue <br /> Sur la plateforme web de l'efei
                    </div>
                    <div>
                        <Link to="/login">
                            <button type="button">Se connecter</button>
                        </Link>
                    </div>
                </h1>
            </div>
        </div>
    );
}