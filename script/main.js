//___________________import_________________

import ELEMENTS from "../elements.js";
import deleteChild from "./deleteChild.js";
import resetOptions from "./resetOptions.js";
import createExample from "./createExample.js"
import noteHeaderOpen from "./noteHeaderOpen.js";
import noteHeaderClose from "./noteHeaderClose.js";
import checkHeaderCount from "./checkHeaderCount.js";
import defaultVisualSettings from "./default_visual_settings.js";
import openLoading from "./openLoading.js";

// __________________values__________________

let notes = {};
let active_header;
let OpenSettings =  '';
let OpenShortcuts=  '';
let OpenVisual =  '';
let OpenNoteCreate =  '';

//_________________open-notes________________

function closeNote(event){
    ELEMENTS.OPEN_NOTE.style.right = "-100%"
    ELEMENTS.OPEN_NOTE_SCREEN.innerHTML = ""
}

function openNote(obj){
    ELEMENTS.OPEN_NOTE.style.right = "0px"
    if(obj.note_txt.header != ""){
        let header = document.createElement("span")
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
        header.style = `
        font-size: ${obj.note_styles.header_fontSize}px;
        top: 30px;
        left: calc(50%);
        transform: translateX(-50%);
        position: absolute;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        ` 
        header.innerText =  obj.note_txt.header
    } else {
        let header = document.createElement("span")
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
        header.style = `
        font-size: 40px;
        top: 30px;
        left: calc(50%);
        transform: translateX(-50%);
        position: absolute;
        color: black;
        z-index: 1;
        ` 
        header.innerText =  obj.note_txt.header
    }
    if(obj.note_txt.txt != ""){
        let text = document.createElement("span")
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
        text.style = `
        font-size: ${obj.note_styles.txt_fontSize}px;
        top: calc(60px + ${obj.note_styles.txt_fontSize}px);
        left: 30px;
        width: auto;
        position: absolute;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        ` 
        text.innerText =  obj.note_txt.txt
    } else {
        let text = document.createElement("span")
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
        text.style = `
        font-size: 20px;
        top: calc(60px + 20px);
        left: 30px;
        width: auto;
        position: absolute;
        color: black;
        z-index: 1;
        ` 
        text.innerText =  obj.note_txt.txt
    }
    if (obj.note_styles.picture_url != "") {
        let picture = document.createElement("div")
        ELEMENTS.OPEN_NOTE_SCREEN.appendChild(picture);
        picture.style.backgroundImage = `url(${obj.note_styles.picture_url})`
        picture.style.backgroundRepeat = `no-repeat`
        picture.style.backgroundSize = `cover`
        picture.style.zIndex = 0
        picture.style.width = "100%"
        picture.style.height = "100%"
        picture.style.position = "absolute"
        picture.style.left = "0"
        picture.style.top = "0"
    }
}

//__________________settings_________________

ELEMENTS.SETTINGS_ICON.addEventListener('click', e => {
    ELEMENTS.SETTINGS.style.transform = "translateX(0px)"
})

ELEMENTS.SETTINGS.addEventListener('click', e => {
    ELEMENTS.SETTINGS.style.transform = "translateX(-100%)"
})
// ___________open-visual-settings___________

ELEMENTS.BUTTON_SUBMIT_VISUAL_SETTINGS.addEventListener('click', e => {
    document.querySelector(':root').style.setProperty("--menu_color", ` ${ELEMENTS.OPTION_MAIN_BASE_COLOR.value}`); 
    document.querySelector(':root').style.setProperty("--notes_color", ` ${ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.value}`); 
    document.querySelector(':root').style.setProperty("--button_color", ` ${ELEMENTS.OPTION_MAIN_BUTTON_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--txt_color", ` ${ELEMENTS.OPTION_MAIN_TXT_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--header_font-size", `${ELEMENTS.OPTION_MAIN_HEADER_FONT_SIZE.value}px` );
    document.querySelector(':root').style.setProperty("--text_font-size", `${ELEMENTS.OPTION_MAIN_TEXT_FONT_SIZE.value}px`);

    ELEMENTS.MENU_HEADER.innerText = ELEMENTS.OPTION_MAIN_HEADER.value;
})

ELEMENTS.BUTTON_VISUAL_SETTINGS.addEventListener('click', e => {
    ELEMENTS.MAIN.style.transform = `translateY(${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(0)"
    openLoading();
    defaultVisualSettings();
})

ELEMENTS.BUTTON_RESET_VISUAL_SETTINGS.addEventListener('click', e => {
    ELEMENTS.MAIN.style.transform = `translateY(0)`;
    ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(-120%)"
    openLoading();
})

// _______________create-header_____________

function closeHeader(event){
    let element = 0
    document.querySelectorAll(".note-header_main").forEach((el,i)=>{
        if(el == event.target) element = document.querySelectorAll(".note-header_main")[i]
    })
    if(element == 0) return
    element.removeEventListener('click', closeHeader);
    noteHeaderClose(element.parentElement);
    element.addEventListener('click', openHeader);
}

function openHeader(event){
    let element = 0
    document.querySelectorAll(".note-header_main").forEach((el,i)=>{
        if(el == event.target) element = document.querySelectorAll(".note-header_main")[i]
    })
    if(element == 0) return
    element.removeEventListener('click', openHeader);
    noteHeaderOpen(element.parentElement);
    element.addEventListener('click', closeHeader);
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
    NOTE_TEMP.querySelector(".note-header_main").addEventListener('click', openHeader);


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
    const NOTE_TEMP = document.createElement("div");
    active_header.appendChild(NOTE_TEMP);
    NOTE_TEMP.classList.add("note-header_note-child");
    NOTE_TEMP.innerHTML += `
        <div class="note-header_header-child">${notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value][0].header}</div>
        <div class="note-header_delete-child">+</div>
    `;

    let name = ELEMENTS.OPTION_HEAD.value;
    checkHeaderCount(active_header);

    console.log(note)
    NOTE_TEMP.addEventListener('click',e=>{openNote(note)})
    ELEMENTS.BUTTON_RESET_OPEN_NOTE.addEventListener('click',closeNote)

    active_header.querySelectorAll(".note-header_delete-child").forEach(el => el.addEventListener('click', e => {
        delete notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][name];
        deleteChild(e);
        checkHeaderCount(active_header);
    }));
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings));
    
    document.querySelector

    resetOptions();
}


// ________________create-note________________

function closeNoteSettings(event) {
    openLoading();
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

    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value] = [];
    console.log(notes)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value].push(note_txt)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value].push(note_styles)
    let noteOBJ = {note_txt:note_txt,note_styles:note_styles}
    createNote(noteOBJ);
    closeNoteSettings();
}

function openNoteSettings(event) {
    openLoading();
    ELEMENTS.MAIN.style.transform = `translateY(-${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.NOTE_SETTINGS.style.transform = `translateY(0px)`;

    active_header = event.target.parentElement;
    ELEMENTS.BUTTON_SUBMIT.addEventListener('click', createNode);
    ELEMENTS.BUTTON_RESET_NOTE.addEventListener('click', closeNoteSettings);
    ELEMENTS.BUTTON_CREATE_EXAMPLE.addEventListener('click', createExample);
}

document.addEventListener('DOMContentLoaded',e=>{
    ELEMENTS.LOADER.style.display ="none"
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings)); 
    ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);
})
//  ___________open-shortcuts-settings___________

ELEMENTS.BUTTON_SHORTCUTS_SETTINGS.addEventListener('click',(e)=>{
    ELEMENTS.SHORTCUTS.style.transform = "translateX(0%)"
})
ELEMENTS.SHORTCUTS_EXIT.addEventListener('click',(e)=>{
    ELEMENTS.SHORTCUTS.style.transform = "translateX(130%)"
})
// ___________add-shortcuts___________
function listenerRemoveV1(e) {
    ELEMENTS.BUTTON_SHORTCUTSV1.innerText = `текущая настройка: 'Alt + ${e.key}'`;
    window.removeEventListener('keydown', listenerRemoveV1);
    OpenSettings = e.code;
}

function listenerRemoveV2(e) {
    ELEMENTS.BUTTON_SHORTCUTSV2.innerText = `текущая настройка: 'Alt + ${e.key}'`;
    window.removeEventListener('keydown', listenerRemoveV2);
    OpenShortcuts = e.code;
}

function listenerRemoveV3(e) {
    ELEMENTS.BUTTON_SHORTCUTSV3.innerText = `текущая настройка: 'Alt + ${e.key}'`;
    window.removeEventListener('keydown', listenerRemoveV3);
    OpenVisual = e.code;
}

function listenerRemoveV4(e) {
    ELEMENTS.BUTTON_SHORTCUTSV4.innerText = `текущая настройка: 'Alt + ${e.key}'`;
    window.removeEventListener('keydown', listenerRemoveV4);
    OpenNoteCreate = e.code;
}

ELEMENTS.BUTTON_SHORTCUTSV1.addEventListener('click', () => {
    window.addEventListener('keydown', listenerRemoveV1);
});

ELEMENTS.BUTTON_SHORTCUTSV2.addEventListener('click', () => {
    window.addEventListener('keydown', listenerRemoveV2);
});

ELEMENTS.BUTTON_SHORTCUTSV3.addEventListener('click', () => {
    window.addEventListener('keydown', listenerRemoveV3);
});

ELEMENTS.BUTTON_SHORTCUTSV4.addEventListener('click', () => {
    window.addEventListener('keydown', listenerRemoveV4);
});

// ___________use-shortcuts__________
window.addEventListener('keydown', (ev) => {
    if (OpenSettings === ev.code && ev.altKey) {
        ev.preventDefault();
        ELEMENTS.SETTINGS.style.transform = "translateX(0px)";
    }
    else if (OpenShortcuts === ev.code && ev.altKey) {
        ev.preventDefault();
        ELEMENTS.SHORTCUTS.style.transform = "translateX(0px)";
    }
    else if (OpenVisual === ev.code && ev.altKey) {
        ev.preventDefault();
    ELEMENTS.MAIN.style.transform = `translateY(${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(0)"
    }
    else if (OpenNoteCreate === ev.code && ev.altKey) {
        ev.preventDefault();
         ELEMENTS.HEADER_SETTINGS.style.transform = "translateY(-50%)";
    }
});
