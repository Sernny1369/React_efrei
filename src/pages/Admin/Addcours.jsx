import AddCoursForm from "../../componants/formulaire/cours";
import React from 'react';

export default function Addcours() {
    return (
        <>
            <div className="container">
                <div className="content-container">
                    <h1  >Ajouter une note</h1>
                    <AddCoursForm />
                </div>
            </div>
        </>
    );
}