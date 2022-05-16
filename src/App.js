import React, { useState } from "react";
// import './css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.css";
import "./css/normalize.css";
import "./css/styles.css";
import Note from "./Note";

export default function App() {
	let notesList = [];
	for (let i = 0; i < localStorage.length; i++) {
		notesList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}

	const randomidGenerator = () => {
		return Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(2, 10);
	};

	const [notes, updateNotes] = useState(notesList);

	const newNote = () => {
		let noteTemplate = {
			key: randomidGenerator(),
			title: "Give me a title!",
			text: "I WANT TEXT",
			due: "",
		};
		localStorage.setItem(noteTemplate.key, JSON.stringify(noteTemplate));
		updateNotes([...notes, noteTemplate]);

		/*
            Currently if a note is created and then deleted, the note component gets deleted in the DOM but stills exists in React's virtual DOM.
            Therefore if a new note is created it may conflict with an already existent component that is already in the virtual DOM (2 components with the same key value).
            This can be fixed if the new note's key value won't be depended on the localStorage's length but depended on some sort of counter that exists in the LocalStorage
            that tracks the amount of notes that have been created. It's an easy fix but I can't be bothered. I have already spent too much time on this project.
            
        */
	};
	return (
		<React.Fragment>
			{/* NavBar */}
			{/* 
                I wanted to make the navBar into a seperate component but that would mean moving the note creation button somewhere else
                and having to link states between components which I can't be bothered to do.
            */}
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						SiimNotes
					</a>
					<div className="collapse navbar-collapse" id="navbarColor01">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<a className="nav-link active" href="#">
									Notes
									<span className="visually-hidden">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									About
								</a>
							</li>
						</ul>
						<button className="btn btn-warning text-dark" onClick={newNote}>
							<i className="bi bi-clipboard-plus"></i> Create new Note
						</button>
					</div>
				</div>
			</nav>
			{/* Actual App */}
			{/*
                Takes notes from notes state (line 15) and creates seperate note components for each note.
            */}
			<div className="container mt-5">
				<div className="row" id="noteContainer">
					{notes.map((note) => {
						return (
							<Note
								key={note.key}
								title={note.title}
								text={note.text}
								due={note.due}
								id={note.key}
							/>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
}
