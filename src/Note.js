import React, {useState} from 'react';


const Note = (props) => {

    let note = {
        "key": props.id,
        "title": props.title,
        "text": props.text,
        "due": props.due
    }

    const [dateValueString, updateDateValueString] = useState(note.due); // This fixes date bug

    // References

    const noteRef = React.createRef(); 
    const editButtonRef = React.createRef();
    const deleteButtonRef = React.createRef();
    const saveButtonRef = React.createRef();

    const noteTitleRef = React.createRef();
    const noteTextRef = React.createRef();
    const noteDateRef = React.createRef();

    // onClick functions

    const editButtonOnClick = () => {
        if(editButtonRef.current.className.includes("hidden") === false){
            deleteButtonRef.current.className=deleteButtonRef.current.className.replace(' hidden', "");
            saveButtonRef.current.className=saveButtonRef.current.className.replace(' hidden', "");
            editButtonRef.current.className+=" hidden";
        }
        noteTitleRef.current.contentEditable = true;
        noteTextRef.current.contentEditable = true;
        noteDateRef.current.disabled = false;
        // else {
        //     deleteButtonRef.current.className+=" hidden";
        //     saveButtonRef.current.className+=" hidden";
        //     editButtonRef.current.className=editButtonRef.current.className.replace(' hidden', "");
        // }

    }
    const deleteButtonOnClick = () => {
        noteRef.current.remove();
        localStorage.removeItem(note.key);
    }
    const saveButtonOnClick = () => {
        noteTitleRef.current.contentEditable = false;
        noteTextRef.current.contentEditable = false;
        noteDateRef.current.disabled = true;
        note.title = noteTitleRef.current.innerHTML.replaceAll("<br>", "\n");
        note.text = noteTextRef.current.innerHTML.replaceAll("<br>", "\n");
        note.due = noteDateRef.current.value;
        localStorage.setItem(note.key, JSON.stringify(note));

        editButtonRef.current.className=editButtonRef.current.className.replace(' hidden', "");
        deleteButtonRef.current.className+=" hidden";
        saveButtonRef.current.className+=" hidden";
    }

    return(
            <div className='col-lg-4 col-md-6 col' id={note.key} ref={noteRef}>
                <div className='card text-white bg-primary mb-3'>
                    <div className='card-header'>
                    <div className='cardButtonHolder'>
                        <button className="btn btn-warning btn-sm text-dark" type="submit" ref={editButtonRef} onClick={editButtonOnClick}><i className="bi bi-pen"></i> Edit</button>
                        <button className="btn btn-danger btn-sm hidden" type="submit" ref={deleteButtonRef} onClick={deleteButtonOnClick}><i className="bi bi-trash"></i> Delete</button>
                        <button className="btn btn-success btn-sm hidden" type="submit" ref={saveButtonRef} onClick={saveButtonOnClick}><i className="bi bi-save"></i> Save</button>
                    </div>
                    </div>
                    <div className='card-body'>
                        <h4 className='card-title' ref={noteTitleRef}>{note.title}</h4>
                        <p className='card-text' ref={noteTextRef}>{note.text}</p>
                    </div>
                    <div className='card-footer'>
                        <div className="input-group input-group-sm">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Due</span>
                                </div>
                                <input type="date" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" ref={noteDateRef} value={dateValueString} onChange={(e) => updateDateValueString(e.target.value)} disabled />
                        </div>
                    </div>
                </div>
            </div>
    )

}
export default Note;