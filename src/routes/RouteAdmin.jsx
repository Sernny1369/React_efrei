import React from "react";
import { Route, Routes } from "react-router-dom";
import Eleves from "../pages/Admin/Eleves";
import Classes from "../pages/Admin/Classes";
import Filieres from "../pages/Admin/Filieres";
import Profs from "../pages/Admin/Profs";
import Cours from "../pages/Admin/Cours";
import Sessions from "../pages/Admin/Sessions";
import Home from "../pages/Admin/Home";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/eleves" element={<Eleves />} />
            <Route path="/admin/classes" element={<Classes />} />
            <Route path="/admin/filieres" element={<Filieres />} />
            <Route path="/admin/profs" element={<Profs />} />
            <Route path="/admin/cours" element={<Cours />} />
            <Route path="/admin/sessions" element={<Sessions />} />
        </Routes>
    );
}