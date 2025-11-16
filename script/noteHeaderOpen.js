function noteHeaderOpen(element) {
    element.style.height = "calc(var(--note_height) * 8 + var(--base_gap) * 2)";
    element.querySelector(".note-header_note-list").style.display = "flex"
}

export default noteHeaderOpen