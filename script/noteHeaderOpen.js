function noteHeaderOpen(element) {
    element.style.height = "calc(var(--note_height) * 8 + var(--base_gap) * 2)";
    setTimeout(() => {
        element.querySelector(".note-header_note-list").style.display = "flex"
        setTimeout(() => {
            element.querySelector(".note-header_note-list").style.opacity = "1"
        }, 10);
    }, 990);
}

export default noteHeaderOpen