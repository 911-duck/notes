function noteHeaderClose(element,h) {
    element.style.height = h + "px";
    element.querySelector(".note-header_note-list").style.display = "none"
}

export default noteHeaderClose