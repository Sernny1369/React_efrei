import React from "react";
import { Route, Routes } from "react-router-dom";
import Addnote from "../pages/Prof/Addnote";
import Home from "../pages/Prof/Home";
import Cours from "../pages/Prof/Cours";
import Notes from "../pages/Prof/Notes";

export default function ProfRoutes() {
    return (
        <Routes>
            <Route path="/prof" element={<Home />} />
            <Route path="/prof/add-note" element={<Addnote />} />
            <Route path="/prof/cours" element={<Cours />} />
            <Route path="/prof/notes" element={<Notes />} />
            
        </Routes>
    );
}
