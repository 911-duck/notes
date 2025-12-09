import ELEMENTS from "./elements.js";

function searchNote(element, str) {
    const elements = element.querySelectorAll(".note-header_note-child")
    if (str != 0) {
        elements.forEach(el => {
            let name = el.querySelector(".note-header_header-child").innerText
            name = name.split("")
            let arr = str.split("")
            let result = arr.every(e => name.includes(e))
            if (result == false) el.style.display = "none"
        });
    } else {
        elements.forEach(el => {
            el.style.display = "flex"
        });
    }
}

export default searchNote