import React, { useContext, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../context/NoteContext";
import NoteItem from "./NoteItem";
import "../css/Notes.css";
import AddNote from "./AddNote";

export default function Notes() {
  const [noteText,setNoteText] = useState('')
  const [notetitle,setNoteTitle] = useState('');
  const [id, setId] = useState('');
  const { notes, getNotes ,editNote} = useContext(NoteContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('login');
    }
    // eslint-disable-next-line
  },[]);

  const ref = useRef(null);
  const refClocse = useRef(null);
  const updateNote = (note) =>{
     setNoteText(note.description);
     setNoteTitle(note.title);
     setId(note._id);
     ref.current.click();
  }

  const handleClick = (e) =>{
     refClocse.current.click();
     editNote(id,notetitle,noteText);
  }
  return (
    <>
      <div className="note-list my-3">
        <AddNote/>
        <button type="button" ref={ref} on="true" className="btn btn-primary modal-button none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            {`Edit Note`}
        </button>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">{`Edit Note`}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                 <div className="form-floating mb-3">
                 <input type="email" className="form-control" id="floatingInput" minLength={5} onChange={(e)=>{setNoteTitle(e.target.value)}} value={notetitle} placeholder="name@example.com"/>
                 <label htmlFor="floatingInput">Title</label>
                 </div>

              <label htmlFor="floatingTextarea" className='desc-label'>Description</label>
              <div className="form-floating">
                <textarea className="form-control textarea" minLength={5} onChange={(e)=>{setNoteText(e.target.value)}} value={noteText} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
              </div>

            </div>
            <div className="modal-footer">
               <button type="button" ref={refClocse} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button type="button" className="btn btn-primary" onClick={handleClick}>{`Update`}</button>
            </div>
           </div>
         </div>
       </div>
        {notes.map((note) => {
          return <NoteItem note={note} updateNote={updateNote} key={note._id} />;
        })}
      </div>
    </>
  );
}
