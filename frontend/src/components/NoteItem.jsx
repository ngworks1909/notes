import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import "../css/NoteItem.css";
import { ModeContext } from "../context/ModeContext";
import { NoteContext } from "../context/NoteContext";

export default function NoteItem(props) {
  const { note,updateNote} = props;
  const {deleteNote} = useContext(NoteContext);
  const {dark} = useContext(ModeContext);
  return (
    <>
      <div className={`note display-flex justify-between flex-column ${dark && 'dark-note'}`}>
        <div className="text-wrapper display-flex flex-column">
          <h5 className="card-title">{note.title}</h5>
          <span>{note.description}</span>
        </div>
        <div className="note-footer display-flex align-center justify-between">
          <RiDeleteBin6Line size={"1.3rem"} className="mx-2 cursor-pointer" onClick={()=>{deleteNote(note._id)}}/>
          <FiEdit size={"1.2rem"} className="mx-2 cursor-pointer" onClick={()=>{updateNote(note)}} />
        </div>
      </div>
    </>
  );
}
