import React from 'react';
import NotesImg from '../../Notes.jpg';

export default function Home(){
    return(
        <div className="text-center">
            <h2>Welcome to Notes App</h2>
            <img className="mt-2 mb-2" src={NotesImg} alt="Note" />
        </div>
    )
}