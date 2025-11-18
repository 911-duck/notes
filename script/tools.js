//import
import ELEMENTS from "../elements.js";

//eventListeners
function openTextEditor(event){
    ELEMENTS.TEXT_EDITOR.style.top = "50%"
}

ELEMENTS.EDIT_TEXT.addEventListener('click',openTextEditor)