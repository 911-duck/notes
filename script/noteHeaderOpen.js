function noteHeaderOpen(element) {
    let h = element.offsetHeight 
    element.style.height = "calc(var(--note_height) * 8 + var(--base_gap) * 2)";
    element.querySelector(".note-header_note-list").style.display = "flex"
    return h
}

export default noteHeaderOpen