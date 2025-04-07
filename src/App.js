import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './pages/Home';
import Plan from './pages/Planning';
import Notes from './pages/Notes';
import Account from './pages/Account';
import Connexion from './pages/Connexion';

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Connexion />} />
            </Routes>
        </Router>
    );
};
