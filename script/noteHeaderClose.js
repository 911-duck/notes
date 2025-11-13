function noteHeaderClose(element) {
    element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
    element.querySelector(".note-header_note-list").style.opacity = "0"
    element.querySelector(".note-header_note-list").style.display = "none"
    setTimeout(() => {
        element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
    }, 1000);
}

export default noteHeaderClose