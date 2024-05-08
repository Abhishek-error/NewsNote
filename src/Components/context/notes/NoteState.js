
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async() => {
    // api calling
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET',
     headers: {
       'content-type': 'application/json',
       "auth-token": localStorage.getItem('token')
     }
   })
   const json = await response.json()
       setNotes(json)
     }



  // adding note 
  const addNote = async(title, description, tag) => {
 // api calling
 const response = await fetch(`${host}/api/notes/addnote`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    "auth-token": localStorage.getItem('token')
  },
  body : JSON.stringify({title, description, tag})
})

const note = await response.json()
setNotes(notes.concat(note))
  }

  // deleteing Note
  const deleteNote = async(id) => { 
      // api calling
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
     method: 'DELETE',
     headers: {
       'content-type': 'application/json',
       "auth-token": localStorage.getItem('token')
     }
   })
   const json = await response.json()
       setNotes(json)
       const newNotes = notes.filter((note) => { return note._id !== id })
       setNotes(newNotes)

  }

  // note editing

  const editNote = async (id, title, description, tag) => {

    // api calling
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body : JSON.stringify({title, description, tag})
    })
    let newNotes = JSON.parse(JSON.stringify(notes))
    const json = response.json()
    console.log(json)
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes)
  }
  const handleCpyText = async (id) => {
      // api calling
      const response = await fetch(`${host}/api/notes/fetchnote/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')

        }
        
      });
      const json = await response.json();
      console.log(json)
      await navigator.clipboard.writeText("Title : " + json.title + "Description : " + json.description +" Tag : " +json.tag);
      document.getSelection().removeAllRanges();
  };
    

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, handleCpyText }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;




