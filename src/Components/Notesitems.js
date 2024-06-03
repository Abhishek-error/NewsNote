import React, { useContext } from 'react'
import noteContext from './context/notes/noteContext';

const Notesitems = (props) => {
  const context = useContext(noteContext)
  const { deleteNote, handleCpyText} = context;
  
    const {note, updateNote} = props;
   

    
return(
    <>
    <div className="card col-md-3 my-2 mx-3">
  
    <div className="card-body">
      <h5 className="card-title" id="title">{"Title : " + note.title}</h5>
      <p className="card-text" id="description">{"Description : " + note.description}</p>
      <p className="card-text" id="tag">{"Tag : " + note.tag}</p>

      <i className="fa-solid fa-trash mx-2" onClick={()=> {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success")}}></i>
      <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
      <i class="fa-regular fa-copy mx-2" onClick={()=>{handleCpyText(note._id); props.showAlert("Note Copied Successfully", "success")}}></i>

    </div>
  </div>
    </>
  )
}

export default Notesitems
