import React from "react";
import { Route, Routes } from "react-router-dom";
import Addnote from "../pages/Prof/Addnote";
import Home from "../pages/Prof/Home";

export default function ProfRoutes() {
    return (
        <Routes>
            <Route path="/prof" element={<Home />} />
            <Route path="/prof/add-note" element={<Addnote />} />
        </Routes>
    );
}