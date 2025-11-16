import ELEMENTS from "../elements.js";

function openLoading(){
    ELEMENTS.LOADER.style.display ="flex"
        setTimeout(() => {
        ELEMENTS.LOADER.style.display ="none"
        }, 1000);
}

export default openLoading