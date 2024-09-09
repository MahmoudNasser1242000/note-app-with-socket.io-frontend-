const socket = io("http://localhost:3000/");

const notes_container = document.querySelector("#notes-container");
const note_title = document.querySelector("#note-title");
const note_desc = document.querySelector("#note-desc");
const form_btn = document.querySelector("#add-note");

