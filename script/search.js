import ELEMENTS from "./elements.js";

function search(str) {
    const elements = document.querySelectorAll(".note-headers_note-header")
    let count = 0
    if (str != 0) {
        elements.forEach(el => {
            let name = el.querySelector(".note-header_main").querySelector(".note-header_name").innerText
            name = name.split("")
            let arr = str.split("")
            let result = arr.every(e => name.includes(e))
            if (result == false) {
                el.style.display = "none"
                count++
            }
        });
        if (count - elements.length == 0) document.querySelector(".main").style.backgroundImage = "url('./img/free-icon-leaf-74867778.png')"
        else document.querySelector(".main").style.backgroundImage = "none"
    } else {
        elements.forEach(el => {
            el.style.display = "flex"
        document.querySelector(".main").style.backgroundImage = "none"

        });
    }
}

export default search