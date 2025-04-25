import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './componants/Header';
import Home from './pages/Home';

import HomeLog from './pages/Home_login';
import Plan from './pages/Planning';
import Notes from './pages/Notes';
import Account from './pages/Account';
import Connexion from './pages/Connexion';
import Adddnote from './pages/Prof/Addnote';
import Adddcours from './pages/Admin/Addcours';
import LoginAdmin from './pages/Admin/LoginAdmin';
import LoginProf from './pages/Prof/LoginProf';
import LoginStudent from './pages/Student/LoginStudent';

function App() {
    const location = useLocation(); // Récupère le chemin actuel

    return (
        <>
            {/* Affiche le Header sauf si le chemin est "/" */}
            {location.pathname !== '/' && location.pathname !== '/login' && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home_log" element={<HomeLog />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Connexion />} />
                <Route path="/addnote" element={<Adddnote />} />
                <Route path="/addcours" element={<Adddcours />} />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/login-prof" element={<LoginProf />} />
                <Route path="/login-student" element={<LoginStudent />} />
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