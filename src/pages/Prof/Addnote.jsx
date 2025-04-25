import NoteForm from "../../componants/formulaire/NoteForm";
import React from 'react';

export default function Addnote() {
    return (
        <>
            <div className="container">
                <div className="content-container">
                    <h1  >Ajouter une note</h1>
                    <NoteForm />
                </div>
            </div>
        </>
    );
}