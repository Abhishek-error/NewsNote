import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from './context/notes/noteContext';
import Notesitems from './Notesitems';
import Addnote from './Addnote';


const Notes = (props) => {
  
  const {showAlert } = props;
    const context = useContext(noteContext)
  const { notes, getNotes, editNote} = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

 const  updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    props.showAlert("Note Updated Successfully", "success")
  }
  const handleClick = (e) => {
    refClose.current.click();
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setNote(note.id, note.etitle, note.edescription, note.etag)
    // setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Updated Successfully", "success")
  } 
  const onchange = (e) => {
      setNote({...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Addnote showAlert={showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form style={{ marginTop: "2rem" }}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input minLength={5} required type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={onchange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input minLength={5} required type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onchange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onchange} />
                </div>
              </form>


            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"   onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    <div className="container" >


      <div className="mx-3 " style={{marginTop: '5rem'}} >
        <h2 style={{textAlign: 'center', marginBottom: '4rem'}} > YOUR NOTE</h2>
        <div className="container">

        {notes.length === 0 && "NO NOTES FOR DISPLAY. PLEASE WRITE ANY NOTE."}
        </div>
        <div className="row">

          {notes.map((note) => {

            return <Notesitems showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />

          })}
        </div>  
      </div>
      </div>

    </>
  )
}

export default Notes


