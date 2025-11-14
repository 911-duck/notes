//___________________import_________________

import ELEMENTS from "../elements.js";
import deleteChild from "./deleteChild.js";
import createExample from "./createExample.js"
import noteHeaderOpen from "./noteHeaderOpen.js";
import noteHeaderClose from "./noteHeaderClose.js";
import checkHeaderCount from "./checkHeaderCount.js";
import resetOptions from "./resetOptions.js";

// __________________values__________________

let notes = {};
let active_header;

//__________________settings_________________

// !code here 

// _______________create-header______________

function createHeader(event) {
    const NOTE_TEMP = document.createElement("div");
    ELEMENTS.HEADERS.appendChild(NOTE_TEMP);
    NOTE_TEMP.classList.add("note-headers_note-header");
    NOTE_TEMP.classList.add("note-header");
    NOTE_TEMP.innerHTML += `
                <div class="note-header_main">
                    <div class="note-header_name">${ELEMENTS.OPTION_HEADER.value}</div>
                    <div class="note-header_headers">0 заметок</div>
                </div>
                <div class="note-header_note-list">
                    <div class="note-header_note-add">+ добавить</div>
                </div>
    `;
    let counter = 0;
    NOTE_TEMP.addEventListener('click', e => {
        setTimeout(() => {
            counter++;
        }, 2100);
        if (counter % 2 == 0) {
            noteHeaderOpen(NOTE_TEMP);
        } else {
            noteHeaderClose(NOTE_TEMP);
        }
    });

    ELEMENTS.BUTTON_ADD_NOTE.forEach(el => el.removeEventListener('click', openNoteSettings));
    ELEMENTS.BUTTON_ADD_NOTE = document.querySelectorAll(".note-header_note-add");
    ELEMENTS.BUTTON_ADD_NOTE.forEach(el => el.addEventListener('click', openNoteSettings));

    ELEMENTS.MAIN.style.backgroundImage = "none";
    notes[NOTE_TEMP.querySelector(".note-header_main").querySelector(".note-header_name").innerText] = [];
    closeHeaderSettings();
}

function closeHeaderSettings(event) {
    ELEMENTS.HEADER_SETTINGS.style.transform = `translateY(-${ELEMENTS.MAIN.offsetHeight}px)`;

    ELEMENTS.BUTTON_SUBMIT_HEADER_CREATE.removeEventListener('click', createHeader);
    ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);
    ELEMENTS.BUTTON_RESET_HEADER.removeEventListener('click', closeHeaderSettings);
}

function openHeaderSettings(event) {
    ELEMENTS.HEADER_SETTINGS.style.transform = "translateY(-50%)";

    ELEMENTS.BUTTON_SUBMIT_HEADER_CREATE.addEventListener('click', createHeader);
    ELEMENTS.BUTTON_ADD_HEADER.removeEventListener('click', openHeaderSettings);
    ELEMENTS.BUTTON_RESET_HEADER.addEventListener('click', closeHeaderSettings);
}

function createNote(note) {
    active_header.innerHTML += `
    <div class="note-header_note-child">
        <div class="note-header_header-child">${notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value][0].header}</div>
        <div class="note-header_delete-child">+</div>
    </div>
    `;

    let name = ELEMENTS.OPTION_HEAD.value;
    checkHeaderCount(active_header);

    active_header.querySelectorAll(".note-header_delete-child").forEach(el => el.addEventListener('click', e=>{
        delete notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][name];
        deleteChild(e);
        checkHeaderCount(active_header);
    })); 
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings)); 

    resetOptions();
}

ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);

// ________________create-note________________

function closeNoteSettings(event) {
    ELEMENTS.MAIN.style.transform = `translateY(0%)`;
    ELEMENTS.NOTE_SETTINGS.style.transform = `translateY(120%)`;

    ELEMENTS.BUTTON_SUBMIT.removeEventListener('click', createNode);
    ELEMENTS.BUTTON_RESET_NOTE.removeEventListener('click', closeNoteSettings);
    ELEMENTS.BUTTON_ADD_NOTE.forEach(el => el.addEventListener('click', openNoteSettings)); 
    ELEMENTS.BUTTON_CREATE_EXAMPLE.removeEventListener('click', createExample);
}

function createNode(event) {
    let note_txt = {
        header: ELEMENTS.OPTION_HEAD.value,
        txt: ELEMENTS.OPTION_TXT.value
    };
    let note_styles = {
        header_fontSize: ELEMENTS.OPTION_HEAD_FS.value,
        txt_fontSize: ELEMENTS.OPTION_TXT_FS.value,
        txt_color: ELEMENTS.OPTION_TXT_COLOR.value,
        picture_url: ELEMENTS.OPTION_URL.value
    };

// active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText

    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]=[];
    console.log(notes)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value].push(note_txt)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value].push(note_styles)
    createNote(notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]);
    closeNoteSettings();
}

function openNoteSettings(event) {
    ELEMENTS.MAIN.style.transform = `translateY(-${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.NOTE_SETTINGS.style.transform = `translateY(0px)`;

    active_header = event.target.parentElement;
    ELEMENTS.BUTTON_SUBMIT.addEventListener('click', createNode);
    ELEMENTS.BUTTON_RESET_NOTE.addEventListener('click', closeNoteSettings);
    ELEMENTS.BUTTON_CREATE_EXAMPLE.addEventListener('click', createExample);
}

document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings)); 