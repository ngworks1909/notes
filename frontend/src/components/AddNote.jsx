import React,{useContext, useState} from 'react'
import { NoteContext } from '../context/NoteContext';
import '../css/AddNote.css'

export default function AddNote() {
    const {addNote} = useContext(NoteContext);
    const [noteText,setNoteText] = useState('')
    const [notetitle,setNoteTitle] = useState('');
    const charlimit = 200;
    const handleChange=(event)=>{
       if(charlimit - event.target.value.length >= 0){
        setNoteText(event.target.value);
       }
    }
    const handleSaveClick=(e)=>{
        e.preventDefault();
        addNote(notetitle,noteText);
        setNoteText('');
        setNoteTitle('')
    }
  return (
    <div className='new note display-flex justify-between flex-column'>
        <div className="note-block display-flex flex-column">
        <input type="text" name="note-title" id="note-title" onChange={(e)=>{setNoteTitle(e.target.value)}} value={notetitle} className='note-title' minLength={5} placeholder='Add title...' required/>
        <textarea name="note-text" className='note-text' id="note-text" cols="10" rows="6" placeholder='Type to add a note...' value={noteText} minLength={5} onChange={handleChange} required></textarea>
        </div>
        <div className="note-footer display-flex align-center justify-between">
            <small>{charlimit - noteText.length} Remaining</small>
            <button className={`save cursor-${(notetitle.length < 5 || noteText.length < 5)? 'disabled':'pointer'}`} disabled={notetitle.length < 5 || noteText.length < 5} onClick ={handleSaveClick}>Save</button>
        </div>
      
    </div>
  )
}