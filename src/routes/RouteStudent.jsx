import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Student/Home";
import MesCours from "../pages/Student/MesCours";
import MesNotes from "../pages/Student/MesNotes";

export default function StudentRoutes() {
    return (
        <Routes>
            <Route path="/student" element={<Home />} />
            <Route path="/student/cours" element={<MesCours />} />
            <Route path="/student/notes" element={<MesNotes />} />

        </Routes>
    );
}