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

/* __________________text-editor______________ */
let activeBlock = 0;
let mouseXY = {
    X: 0,
    Y: 0
}

function unactive(event) {
    document.querySelector(".open-note_screen").removeEventListener("mousemove", move)
    activeBlock.addEventListener("mouseup", unactive)
    activeBlock.addEventListener("mousedown", active)
}

function move(event) {
    let x = mouseXY.X - event.clientX
    let y = mouseXY.Y - event.clientY
    console.log(x, y)
    activeBlock.style.top = activeBlock.offsetTop - y + "px"
    activeBlock.style.left = activeBlock.offsetLeft - x + "px"
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
}

function active(event) {
    activeBlock = this
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
    activeBlock.style.border = "white solid 2px"
    document.querySelector(".open-note_screen").addEventListener("mousemove", move)
    activeBlock.addEventListener("mouseup", unactive)
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
    console.log(activeBlock, mouseXY.X, mouseXY.Y)
}

function createTextBlock() {
    const TEXT = document.querySelector('.ql-editor').innerHTML;
    const TEXT_BLOCK = document.createElement("div");
    TEXT_BLOCK.innerHTML = TEXT;
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(TEXT_BLOCK);
    TEXT_BLOCK.classList.add(`move-block`)
    TEXT_BLOCK.style.top = "80px"
    TEXT_BLOCK.style.left = "80px"
    TEXT_BLOCK.addEventListener('mousedown', active)
}

function closeTextEditor(event) {
    ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.TEXT_EDITOR.style.top = "150%"
    createTextBlock();
}

function openTextEditor(event) {
    console.log(document.querySelector('.ql-editor').innerHTML)

    ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
    ELEMENTS.TEXT_EDITOR.style.top = "70%"
}

function closeTextReeditor(event) {
    ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
    ELEMENTS.EDIT_TEXT.removeEventListener('click', closeTextReeditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.TEXT_EDITOR.style.top = "150%"
    activeBlock.innerHTML = document.querySelector('.ql-editor').innerHTML
}

function openTextReeditor(event) {
    if (activeBlock != 0) {
        document.querySelector('.ql-editor').innerHTML = activeBlock.innerHTML

        ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
        ELEMENTS.EDIT_TEXT.addEventListener('click', closeTextReeditor)

        ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
        ELEMENTS.TEXT_EDITOR.style.top = "70%"
    }
}

function resetActiveBlock(event) {
    activeBlock = 0;
    activePBlock = 0;
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
}

function deleteActiveBlock(event) {
    if (activeBlock != 0) {
        activeBlock.remove()
    }
    if (activePBlock != 0) {
        activePBlock.remove()
    }
}

let url
let width
let height
let activePBlock

function unactiveP(event) {
    document.querySelector(".open-note_screen").removeEventListener("mousemove", moveP)
    activePBlock.addEventListener("mouseup", unactiveP)
    activePBlock.addEventListener("mousedown", activeP)
}

function moveP(event) {
    let x = mouseXY.X - event.clientX
    let y = mouseXY.Y - event.clientY
    console.log(x, y)
    activePBlock.style.top = activePBlock.offsetTop - y + "px"
    activePBlock.style.left = activePBlock.offsetLeft - x + "px"
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
}

function activeP(event) {
    activePBlock = this
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
    activePBlock.style.border = "white solid 2px"
    document.querySelector(".open-note_screen").addEventListener("mousemove", moveP)
    activePBlock.addEventListener("mouseup", unactiveP)
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
    console.log(activePBlock, mouseXY.X, mouseXY.Y)
}

function createPictureBlock(event) {
    const PICTURE_BLOCK = document.createElement("div");
    PICTURE_BLOCK.style.backgroundImage = `url("${url}")`
    PICTURE_BLOCK.style.backgroundSize = `cover`
    PICTURE_BLOCK.style.width = `${width}px`
    PICTURE_BLOCK.style.height = `${height}px`
    PICTURE_BLOCK.classList.add(`move-block`)
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(PICTURE_BLOCK);
    PICTURE_BLOCK.style.top = "80px"
    PICTURE_BLOCK.style.left = "80px"
    PICTURE_BLOCK.addEventListener('mousedown', activeP)
}

function createDraftPicture(event) {
    url = document.querySelector(".picture-editor_option-backGround-url").value
    width = document.querySelector(".picture-editor_option-width").value
    height = document.querySelector(".picture-editor_option-height").value
    document.querySelector('.test_picture').style.backgroundImage = `url("${url}")`
    document.querySelector('.test_picture').style.width = `${width}px`
    document.querySelector('.test_picture').style.height = `${height}px`
    ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE.addEventListener('click', createPictureBlock)
}

function closePictureEditor(event) {
    ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
    ELEMENTS.ADD_PICTURE.removeEventListener('click', closePictureEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.PICTURE_EDITOR.style.top = "150%"
}

function addPicture(event) {
    ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
    ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE_DRAFT.addEventListener('click', createDraftPicture)
    ELEMENTS.ADD_PICTURE.addEventListener('click', closePictureEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
    ELEMENTS.PICTURE_EDITOR.style.top = "70%"
}

ELEMENTS.DELETE_ACTIVE_BLOCK.addEventListener('click', deleteActiveBlock)
ELEMENTS.OPEN_NOTE_SCREEN.addEventListener('dblclick', resetActiveBlock)

ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)

//_________________open-notes________________

let active_note;

function closeNote(event) {
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][active_note].innerHtml = ELEMENTS.OPEN_NOTE_SCREEN.innerHTML
    ELEMENTS.OPEN_NOTE.style.right = "-100%"
    ELEMENTS.OPEN_NOTE_SCREEN.innerHTML = ""
    console.log(notes)
}

function openNote(obj) {
    active_note = obj.note_txt.header
    if (obj.innerHtml == 0) {
        ELEMENTS.OPEN_NOTE.style.right = "0px"
        if (obj.note_txt.header != "") {
            let header = document.createElement(obj.note_styles.header_fontSize)
            header.style = `
        top: 30px;
        left: calc(50%);
        transform: translateX(-50%);
        position: absolute;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        `
            header.innerText = obj.note_txt.header
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
            header.classList.add(`move-block`)
            header.addEventListener('mousedown', active)
        } else {
            let header = document.createElement("h1")
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
            header.innerText = obj.note_txt.header
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(header);
            header.classList.add(`move-block`)
            header.addEventListener('mousedown', active)
        }
        if (obj.note_txt.txt != "") {
            let text = document.createElement("p")
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.style = `
        top: calc(100px);
        left: 80px;
        width: auto;
        color: ${obj.note_styles.txt_color};
        z-index: 1;
        `
            text.innerText = obj.note_txt.txt
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.classList.add(`move-block`)
            text.addEventListener('mousedown', active)
        } else {
            let text = document.createElement("p");
            text.classList.add("move-block");
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.style = `
        top: calc(100px);
        left: 30px;
        width: auto;
        color: black;
        z-index: 1;
        `
            text.innerText = obj.note_txt.txt
            ELEMENTS.OPEN_NOTE_SCREEN.appendChild(text);
            text.addEventListener('mousedown', active)
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
    } else {
        ELEMENTS.OPEN_NOTE.style.right = "0px"

        ELEMENTS.OPEN_NOTE_SCREEN.innerHTML = obj.innerHtml
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
    document.querySelector(':root').style.setProperty("--header_font-size", `${ELEMENTS.OPTION_MAIN_HEADER_FONT_SIZE.value}px`);
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

function closeHeader(event) {
    let element = 0
    document.querySelectorAll(".note-header_main").forEach((el, i) => {
        if (el == event.target) element = document.querySelectorAll(".note-header_main")[i]
    })
    if (element == 0) return
    element.removeEventListener('click', closeHeader);
    noteHeaderClose(element.parentElement);
    element.addEventListener('click', openHeader);
}

function openHeader(event) {
    let element = 0
    document.querySelectorAll(".note-header_main").forEach((el, i) => {
        if (el == event.target) element = document.querySelectorAll(".note-header_main")[i]
    })
    if (element == 0) return
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
        <div class="note-header_header-child">${notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_txt"].header}</div>
        <div class="note-header_delete-child">+</div>
    `;

    let name = ELEMENTS.OPTION_HEAD.value;
    checkHeaderCount(active_header);
    active_note = name

    console.log(note)
    NOTE_TEMP.addEventListener('click', e => { 
        console.log(notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][active_note])
        openNote(notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][active_note]) })
    ELEMENTS.BUTTON_RESET_OPEN_NOTE.addEventListener('click', closeNote)

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
        txt_color: ELEMENTS.OPTION_TXT_COLOR.value,
        picture_url: ELEMENTS.OPTION_URL.value
    };

    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value] = [];
    console.log(notes)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_txt"] = note_txt
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["note_styles"] = note_styles
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["innerHtml"] = 0
    let noteOBJ = { note_txt: note_txt, 
        note_styles: note_styles, 
        innerHtml: 0, }
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

document.addEventListener('DOMContentLoaded', e => {
    ELEMENTS.LOADER.style.display = "none"
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings));
    ELEMENTS.BUTTON_ADD_HEADER.addEventListener('click', openHeaderSettings);
    // start api
    const quill = new Quill('#editor', {
        modules: {
            syntax: true,
            toolbar: '#toolbar-container',
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
    });

})

