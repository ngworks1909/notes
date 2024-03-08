import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = ({children}) =>{
    
    const host = 'https://notes-six-mu.vercel.app'
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async() =>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      const json =await response.json();
      setNotes(json);

    }

    const addNote = async(title, description) =>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description}),
      });

      const note = await response.json();
      setNotes(notes.concat(note));

    }

    const deleteNote = async(id) =>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      });
      await response.json();
       const newNotes = notes.filter((note)=>{return note._id !== id});
       setNotes(newNotes);
    }

    const editNote =async(id, title, description) =>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description}),
      });

      await response.json();

      const newNotes = JSON.parse(JSON.stringify(notes));

      for(let index = 0; index < newNotes.length; index++){
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }
      }
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
           {children}
        </NoteContext.Provider>
    );
}
