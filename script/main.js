//___________________import__________________

import ELEMENTS from "../elements.js";

// __________________values__________________

let headers = [];
let notes = [];
let active_header;

//__________________settings_________________

// !code here 

// _______________create-header______________

function noteHeaderClose(element) {
    element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
    element.querySelector(".note-header_note-list").style.opacity = "0"
    element.querySelector(".note-header_note-list").style.display = "none"
    setTimeout(() => {
        element.style.height = "calc(var(--note_height) + var(--base_gap) * 2)";
    }, 1000);
}

function noteHeaderOpen(element) {
    element.style.height = "calc(var(--note_height) * 8 + var(--base_gap) * 2)";
    setTimeout(() => {
        element.querySelector(".note-header_note-list").style.display = "flex"
        setTimeout(() => {
            element.querySelector(".note-header_note-list").style.opacity = "1"
        }, 10);
    }, 990);
}

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
    headers.push(ELEMENTS.OPTION_HEADER.value);
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

function deleteChild(event) {
    event.target.parentElement.remove();
}

function createNote(note) {
    active_header.innerHTML += `
    <div class="note-header_note-child">
        <div class="note-header_header-child">${note[0].header}</div>
        <div class="note-header_delete-child">+</div>
    </div>
    `;
    document.querySelectorAll(".note-header_delete-child").forEach(el => el.addEventListener('click', deleteChild)); 
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings)); 
}

ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);

// ________________create-note________________

function createExample(event) {
    ELEMENTS.EXAMPLE.style.backgroundImage = `url("${ELEMENTS.OPTION_URL.value}")`;
    ELEMENTS.EXAMPLE.style.backgroundSize = `cover`;
    ELEMENTS.EXAMPLE_HEAD.innerText = ELEMENTS.OPTION_HEAD.value;
    ELEMENTS.EXAMPLE_HEAD.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
    ELEMENTS.EXAMPLE_HEAD.style.fontSize = ELEMENTS.OPTION_HEAD_FS.value + "px";
    ELEMENTS.EXAMPLE_TXT.innerText = ELEMENTS.OPTION_TXT.value;
    ELEMENTS.EXAMPLE_TXT.style.color = ELEMENTS.OPTION_TXT_COLOR.value;
    ELEMENTS.EXAMPLE_TXT.style.fontSize = ELEMENTS.OPTION_TXT_FS.value + "px";
}

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

    notes.push([note_txt, note_styles]);
    createNote(notes[notes.length - 1]);
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