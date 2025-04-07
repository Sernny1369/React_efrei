import React from 'react';
import { useState } from 'react';

export default function Form() {
    return (
        <>
            <form>
                <label>N°etudiant</label>
                <input type="number" name="etudiant" />
                <label>Note</label>
                <input type="number" name="note" />
                <button>Submit</button>
            </form>
        </>
    )
}
