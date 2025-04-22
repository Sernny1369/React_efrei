import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Home from './pages/Home';

import HomeLog from './pages/Home_login';
import Plan from './pages/Planning';
import Notes from './pages/Notes';
import Account from './pages/Account';
import Connexion from './pages/Connexion';

function App() {
    const location = useLocation(); // Récupère le chemin actuel

    return (
        <>
            {/* Affiche le Header sauf si le chemin est "/" */}
            {location.pathname !== '/' && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home_log" element={<HomeLog />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Connexion />} />
            </Routes>
        </>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}