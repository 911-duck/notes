function noteHeaderClose(element) {
    element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
    element.querySelector(".note-header_note-list").style.display = "none"
    element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
}

export default noteHeaderClose