import ELEMENTS from "../elements.js";

function search(element, str) {
    const elements = document.querySelectorAll(".note-headers_note-header")
    if (str != 0) {
        elements.forEach(el => {
            let name = el.querySelector(".note-header_main").querySelector(".note-header_name").innerText
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

export default search