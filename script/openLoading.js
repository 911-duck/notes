import ELEMENTS from "./elements.js";

function openLoading(n) {
    ELEMENTS.LOADER[n].style.display = "flex"
    setTimeout(() => {
        ELEMENTS.LOADER[n].style.display = "none"
    }, 1000);
}

export default openLoading