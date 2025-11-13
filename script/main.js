// !code here 

// _______________create-header_______________

let headers = [];
let active_header;

const MAIN = document.querySelector(".main");
const HEADERS = document.querySelector(".note-headers")
const HEADER_SETTINGS = document.querySelector(".add-header-screen");

const OPTION_HEADER = document.querySelector(".add-header-screen_input");

const BUTTON_ADD_HEADER = document.querySelector(".menu_add-note-header");
const BUTTON_RESET_HEADER = document.querySelector(".add-header-screen_exit");
const BUTTON_SUBMIT_HEADER_CREATE = document.querySelector(".add-header-screen_submit")

let BUTTON_ADD_NOTE = document.querySelectorAll(".note-header_note-add");

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
    HEADERS.appendChild(NOTE_TEMP);
    NOTE_TEMP.classList.add("note-headers_note-header");
    NOTE_TEMP.classList.add("note-header");
    NOTE_TEMP.innerHTML += `
                <div class="note-header_main">
                    <div class="note-header_name">${OPTION_HEADER.value}</div>
                    <div class="note-header_headers">0 note</div>
                </div>
                <div class="note-header_note-list">
                    <div class="note-header_note-add">+ add note</div>
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

    BUTTON_ADD_NOTE.forEach(el => el.removeEventListener('click', openNoteSettings));
    BUTTON_ADD_NOTE = document.querySelectorAll(".note-header_note-add");
    BUTTON_ADD_NOTE.forEach(el => el.addEventListener('click', openNoteSettings));

    headers.push(OPTION_HEADER.value);
    closeHeaderSettings();
}

function closeHeaderSettings(event) {
    HEADER_SETTINGS.style.transform = `translateY(-${MAIN.offsetHeight}px)`;

    BUTTON_SUBMIT_HEADER_CREATE.removeEventListener('click', createHeader);
    BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);
    BUTTON_RESET_HEADER.removeEventListener('click', closeHeaderSettings);
}

function openHeaderSettings(event) {
    HEADER_SETTINGS.style.transform = "translateY(-50%)";

    BUTTON_SUBMIT_HEADER_CREATE.addEventListener('click', createHeader);
    BUTTON_ADD_HEADER.removeEventListener('click', openHeaderSettings);
    BUTTON_RESET_HEADER.addEventListener('click', closeHeaderSettings);
}

function createNote(note) {
    active_header.innerHTML+=`
    <div class="note-header_note-child">
        <div class="note-header_header-child">${note[0].header}</div>
    </div>
    `

    // active_header.parentElement.querySelector(".note-header_main>.note-header_name").innerHTML = " notes";
}

BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);

// ________________create-note________________

let notes = [];

const NODE_SETTINGS = document.querySelector(".note-settings-screen");
const EXAMPLE = document.querySelector(".example");
const EXAMPLE_HEAD = document.querySelector(".example_head");
const EXAMPLE_TXT = document.querySelector(".example_txt");

const OPTION_URL = document.querySelector(".option_backGround-url");
const OPTION_HEAD = document.querySelector(".option_header-txt");
const OPTION_HEAD_FS = document.querySelector(".option_header-font-size");
const OPTION_TXT = document.querySelector(".option_description-txt");
const OPTION_TXT_FS = document.querySelector(".option_description-font-size");
const OPTION_TXT_COLOR = document.querySelector(".option_txt-color");

const BUTTON_SUBMIT = document.querySelector(".note_submit");
const BUTTON_RESET_NOTE = document.querySelector(".note_exit");
const BUTTON_CREATE_EXAMPLE = document.querySelector(".note_create-example");

function createExample(event) {
    EXAMPLE.style.backgroundImage = `url("${OPTION_URL.value}")`;
    EXAMPLE.style.backgroundSize = `cover`;
    EXAMPLE_HEAD.innerText = OPTION_HEAD.value;
    EXAMPLE_HEAD.style.color = OPTION_TXT_COLOR.value;
    EXAMPLE_HEAD.style.fontSize = OPTION_HEAD_FS.value + "px";
    EXAMPLE_TXT.innerText = OPTION_TXT.value;
    EXAMPLE_TXT.style.color = OPTION_TXT_COLOR.value;
    EXAMPLE_TXT.style.fontSize = OPTION_TXT_FS.value + "px";
}

function closeNoteSettings(event) {
    MAIN.style.transform = `translateY(0%)`;
    NODE_SETTINGS.style.transform = `translateY(120%)`;

    BUTTON_SUBMIT.removeEventListener('click', createNode);
    BUTTON_RESET_NOTE.removeEventListener('click', closeNoteSettings);
    BUTTON_CREATE_EXAMPLE.removeEventListener('click', createExample);
}

function createNode(event) {
    let note_txt = {
        header: OPTION_HEAD.value,
        txt: OPTION_TXT.value
    };
    let note_styles = {
        header_fontSize: OPTION_HEAD_FS.value,
        txt_fontSize: OPTION_TXT_FS.value,
        txt_color: OPTION_TXT_COLOR.value,
        picture_url: OPTION_URL.value
    };

    notes.push([ note_txt, note_styles ]);
    createNote(notes[notes.length-1]);
}

function openNoteSettings(event) {
    MAIN.style.transform = `translateY(-${MAIN.offsetHeight}px)`;
    NODE_SETTINGS.style.transform = `translateY(0px)`;

    active_header = event.target.parentElement;
    BUTTON_SUBMIT.addEventListener('click', createNode);
    BUTTON_RESET_NOTE.addEventListener('click', closeNoteSettings);
    BUTTON_CREATE_EXAMPLE.addEventListener('click', createExample);
}

BUTTON_ADD_NOTE.forEach(el => el.addEventListener('click', openNoteSettings)); 