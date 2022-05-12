import React, { useState } from "react";

function NoteList() {
	const [notes, setNotes] = useState([
		{ title: "Hello World", text: "This is some simple text", key: 1 },
		{ title: "Hello World 1", text: "This is some simple text 2", key: 2 },
	]);
	return (
		<React.Fragment>
			{notes.map((note) => {
				return (
					<div key={note.key}>
						<h1>{note.title}</h1>
						<p>{note.text}</p>
					</div>
				);
			})}
		</React.Fragment>
	);
}

export default NoteList;
