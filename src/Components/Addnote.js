import React, { useContext, useState } from 'react'
import noteContext from './context/notes/noteContext';



const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
const {showAlert} = props;

    const [note, setNote] = useState({ title: "", description: "", tag: "General" })



    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "default" })
        showAlert("Note Added Successfully", "success")

    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="container">

            <div className="container" style={{ marginTop: "4rem" }}>
                <h1 style={{textAlign: 'center', marginTop: '2rem'}} >
                    ADD NOTE
                </h1>
                <form style={{ marginTop: "2rem" }}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" minLength={5} required className="form-control" name="title" value={note.title} id="title" onChange={onchange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" cols="100" rows="7" minLength={5} required className="form-control" name="description" value={note.description} id="description" onChange={onchange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onchange} />
                    </div>


                    <button type="submit" id="sub" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5 || note.description.length<5}>Add note</button>
                </form>
            </div>

        </div>
    )
}

export default Addnote
