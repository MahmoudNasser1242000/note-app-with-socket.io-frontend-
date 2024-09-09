const socket = io("http://localhost:3000");

const notes_container = document.querySelector("#notes-container");
const note_title = document.querySelector("#note-title");
const note_desc = document.querySelector("#note-desc");
const form_btn = document.querySelector("#add-note");

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

socket.on("connect", () => {
    socket.emit("load")
})

form_btn.addEventListener("click", (e) => {
    e.preventDefault()
    const note_data = {
        title: note_title.value,
        description: note_desc.value
    }
    socket.emit("add-note", note_data)

    note_title.value = ""
    note_desc.value = ""
})

socket.on("display-notes", (notes) => {
    display_notes(notes)
})
const display_notes = (notes) => {
    let cartona = ``
    notes.forEach((note) => {
        cartona += `
            <div class="card border-dark my-3">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text"
                        data-bs-toggle="tooltip"
                        data-bs-title=${note.description}
                    >
                        ${note.description.split(" ").slice(0, 9).join(" ")} ....
                    </p>
                    <a href="#" class="btn btn-primary" onclick="delete_notes('${note._id}')">Delete</a>
                </div>
            </div>`
    })
    notes_container.innerHTML = cartona;
}