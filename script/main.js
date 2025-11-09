// !code here 

// ________________create-note________________

const MAIN = document.querySelector(".main");
const HEADER_SETTINGS = document.querySelector(".note-header-settings-screen");

const BUTTON_ADD_NOTE_HEADER = document.querySelector(".menu_add-note-header");
const BUTTON_RESET_NOTE_HEADER = document.querySelector(".note-header_exit");

function closeNoteSettings(event){
    BUTTON_RESET_NOTE_HEADER.removeEventListener('click',closeNoteSettings)
    MAIN.style.transform = `translateY(0%)`
    HEADER_SETTINGS.style.transform = `translateY(120%)`
    BUTTON_ADD_NOTE_HEADER.addEventListener('click',openNoteSettings)
}

function openNoteSettings(event){
    BUTTON_ADD_NOTE_HEADER.removeEventListener('click',openNoteSettings)
    MAIN.style.transform = `translateY(-${MAIN.offsetHeight}px)`
    HEADER_SETTINGS.style.transform = `translateY(0px)`
    BUTTON_RESET_NOTE_HEADER.addEventListener('click',closeNoteSettings)
}

BUTTON_ADD_NOTE_HEADER.addEventListener('click',openNoteSettings)