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
import JsonToggles from "./JsonToggles.js";
import TextDeformation from "./TextDeformation.js"
import search from "./search.js";
import searchNote from "./searchNote.js";

// __________________values__________________

let notes = {};
let active_header;
let OpenSettings = '';
let OpenShortcuts = '';
let OpenVisual = '';
let OpenNoteCreate = '';
let OpenTechnical = '';
let version = '6.41';
let developers = 'Бирюк Евгений, Шитенков Кирилл';
let data = 'Nov 9, 2025';

/* __________________search___________________ */

document.querySelector(".menu_search-m").addEventListener("input",e=>{
    if(document.querySelector(".menu_search").value.length > 0)search(ELEMENTS.HEADERS,document.querySelector(".menu_search").value)
    else search(ELEMENTS.HEADERS,"0")
})

/* _______________right-edit-board____________ */

let editEl = 0;

function deleteFonts(element){
    const fontsClasses = [
        "none",
        "noto-sans",
        "playfair-display" ,
        "pacifico-regular" ,
        "science-gothic",
        "ibm-plex-mono-regular" ,
        "great-vibes-regular",
        "Rubik Wet Paint" ,
        "rubik-wet-paint-regular",
        "press-start-2p-regular" ,
        "playfair-display-sc-regular" ,
        "el-messiri",
        "montserrat-underline" ,
        "rubik-bubbles-regular",
        "rampart-one-regular"
    ]
    fontsClasses.forEach(el=>{if(element.classList.contains(el) == true) element.classList.remove(el)})
}

function editElement(event){
    deleteFonts(editEl);
    editEl.style.height = ELEMENTS.OPTION_BOARD_HEIGHT.value + "px"
    editEl.style.width = ELEMENTS.OPTION_BOARD_WIDTH.value + "px"
    editEl.style.left = ELEMENTS.OPTION_BOARD_X.value + "px"
    editEl.style.top = ELEMENTS.OPTION_BOARD_Y.value + "px"
    editEl.style.transform = `rotate(${Math.round(ELEMENTS.OPTION_ROTATE.value)}deg)`
    editEl.style.zIndex = ELEMENTS.OPTION_BOARD_Z_INDEX.value < 30 ? ELEMENTS.OPTION_BOARD_Z_INDEX.value > -1 ? ELEMENTS.OPTION_BOARD_Z_INDEX.value : 0 : 29
    editEl.style.borderRadius = ELEMENTS.OPTION_BOARD_BORDER_RADIUS.value + "px"
    editEl.classList.add(`${ELEMENTS.OPTION_BOARD_FONT.value}`)
    editEl.style.backgroundColor =  ELEMENTS.OPTION_CHECK_BOX_BACKGROUND_COLOR.checked == true ? ELEMENTS.OPTION_BOARD_BACKGROUND_COLOR.value : "none"
}

function closeRightBoardEditor(){
    ELEMENTS.BOARD.style.backgroundImage = 'url("img/free-icon-leaf-7486777.png")'
    ELEMENTS.BG_EDITOR.style.display = "flex"
    ELEMENTS.BOARD_EDITOR.style.display = "none"
    ELEMENTS.BUTTON_BOARD_SUBMIT.removeEventListener('click',editElement)
}

function openRightBoardEditor(el){
    editEl = el
    ELEMENTS.BOARD.style.backgroundImage = "none"
    ELEMENTS.BOARD_EDITOR.style.display = "flex"
    ELEMENTS.BG_EDITOR.style.display = "none"
    ELEMENTS.OPTION_BOARD_HEIGHT.value = el.offsetHeight 
    const values = window.getComputedStyle(el).transform.match(/matrix\((.+)\)/)[1].split(', ');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI)); // Преобразование в градусы
    ELEMENTS.OPTION_ROTATE.value = angle
    ELEMENTS.OPTION_BOARD_WIDTH.value = el.offsetWidth 
    ELEMENTS.OPTION_BOARD_X.value = el.offsetLeft 
    ELEMENTS.OPTION_BOARD_Y.value = el.offsetTop
    ELEMENTS.OPTION_BOARD_BORDER_RADIUS.value = window.getComputedStyle(el).borderRadius[window.getComputedStyle(el).borderRadius.length-1] == 'x' ? window.getComputedStyle(el).borderRadius.slice(0,-2) : window.getComputedStyle(el).borderRadius.slice(0,-1) * el.offsetHeight / 100
    ELEMENTS.OPTION_CHECK_BOX_BACKGROUND_COLOR.checked = false
    ELEMENTS.OPTION_BOARD_BACKGROUND_COLOR.value = "#ffffff"
    ELEMENTS.OPTION_BOARD_Z_INDEX.value = window.getComputedStyle(el).zIndex
    ELEMENTS.BUTTON_BOARD_SUBMIT.addEventListener('click',editElement)
}

function closeBoard(event) {
    ELEMENTS.BUTTON_OPEN_BOARD.addEventListener('click', openBoard)
    ELEMENTS.BOARD.style.transform = "translateX(calc(100% + var(--base_gap)))"
    ELEMENTS.BUTTON_OPEN_BOARD.style.transform = `translateX(0px)`
    ELEMENTS.BUTTON_OPEN_BOARD.removeEventListener('click', closeBoard)
}

function openBoard(event) {
    ELEMENTS.BUTTON_OPEN_BOARD.removeEventListener('click', openBoard)
    ELEMENTS.BOARD.style.transform = "translateX(0px)"
    ELEMENTS.BUTTON_OPEN_BOARD.style.transform = `translateX(calc(-${ELEMENTS.BOARD.offsetWidth}px - var(--base_gap)))`
    ELEMENTS.BUTTON_OPEN_BOARD.addEventListener('click', closeBoard)
}

ELEMENTS.BUTTON_OPEN_BOARD.addEventListener('click', openBoard)

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
    openRightBoardEditor(activeBlock);
    activeBlock.style.top = activeBlock.offsetTop - y + "px"
    activeBlock.style.left = activeBlock.offsetLeft - x + "px"
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
}

function active(event) {
    activeBlock = this
    openRightBoardEditor(activeBlock);
    activePBlock = 0
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
    document.querySelectorAll(".move-p-block").forEach(el => el.style.border = "none")
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
    ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.TEXT_EDITOR.style.top = "150%"
    createTextBlock();
}

function openTextEditor(event) {
    console.log(document.querySelector('.ql-editor').innerHTML)

    ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', closeTextEditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
    ELEMENTS.TEXT_EDITOR.style.top = "70%"
}

function closeTextReeditor(event) {
    ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
    ELEMENTS.EDIT_TEXT.removeEventListener('click', closeTextReeditor)

    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.TEXT_EDITOR.style.top = "150%"
    activeBlock.innerHTML = document.querySelector('.ql-editor').innerHTML
}

function openTextReeditor(event) {
    if (activeBlock != 0) {
        document.querySelector('.ql-editor').innerHTML = activeBlock.innerHTML

    ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
        ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
        ELEMENTS.EDIT_TEXT.addEventListener('click', closeTextReeditor)

        ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
        ELEMENTS.TEXT_EDITOR.style.top = "70%"
    }
}

function resetActiveBlock(event) {
    activeBlock = 0;
    activePBlock = 0;
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
    document.querySelectorAll(".move-p-block").forEach(el => el.style.border = "none")
    closeRightBoardEditor();
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
let activePBlock = 0

function unactiveP(event) {
    document.querySelector(".open-note_screen").removeEventListener("mousemove", moveP)
    activePBlock.addEventListener("mouseup", unactiveP)
    activePBlock.addEventListener("mousedown", activeP)
}

function moveP(event) {
    let x = mouseXY.X - event.clientX
    let y = mouseXY.Y - event.clientY
    openRightBoardEditor(activePBlock)
    activePBlock.style.top = activePBlock.offsetTop - y + "px"
    activePBlock.style.left = activePBlock.offsetLeft - x + "px"
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
}

function activeP(event) {
    activePBlock = this
    openRightBoardEditor(activePBlock);
    activeBlock = 0
    document.querySelectorAll(".move-block").forEach(el => el.style.border = "none")
    document.querySelectorAll(".move-p-block").forEach(el => el.style.border = "none")
    activePBlock.style.border = "white solid 2px"
    document.querySelector(".open-note_screen").addEventListener("mousemove", moveP)
    activePBlock.addEventListener("mouseup", unactiveP)
    // document.addEventListener('keydown', shortcutsTools)
    mouseXY.X = event.clientX
    mouseXY.Y = event.clientY
    console.log(activePBlock, mouseXY.X, mouseXY.Y)
}

function createPictureBlock(event) {
    url = ELEMENTS.OPTION_PICTURE_URL.value

    const PICTURE_BLOCK = document.createElement("div");
    PICTURE_BLOCK.style.backgroundImage = `url("${url}")`
    PICTURE_BLOCK.style.backgroundSize = `contain`
    PICTURE_BLOCK.style.backgroundPosition = `50% 50%`
    PICTURE_BLOCK.style.backgroundRepeat = `no-repeat`
    PICTURE_BLOCK.style.width = `${100}px`
    PICTURE_BLOCK.style.height = `${100}px`
    PICTURE_BLOCK.classList.add(`move-p-block`)
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(PICTURE_BLOCK);
    PICTURE_BLOCK.style.top = "100px"
    PICTURE_BLOCK.style.left = "100px"
    PICTURE_BLOCK.addEventListener('mousedown', activeP)
}

function createDraftPicture(event) {
    url = ELEMENTS.OPTION_PICTURE_URL.value
    document.querySelector('.test_picture').style.backgroundImage = `url("${url}")`
    // ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE.addEventListener('click', createPictureBlock)

}

function closePictureEditor(event) {
    ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
    ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
    ELEMENTS.ADD_PICTURE.removeEventListener('click', closePictureEditor)
    ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE.removeEventListener('click', createPictureBlock)
    
    ELEMENTS.EDIT_BLOCK.style.bottom = "5%"
    ELEMENTS.PICTURE_EDITOR.style.top = "150%"
}

function addPicture(event) {
    ELEMENTS.ADD_PICTURE.removeEventListener('click', addPicture)
    ELEMENTS.EDIT_TEXT.removeEventListener('click', openTextReeditor)
    ELEMENTS.ADD_TEXT.removeEventListener('click', openTextEditor)
    ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE_DRAFT.addEventListener('click', createDraftPicture)
    ELEMENTS.ADD_PICTURE.addEventListener('click', closePictureEditor)
    ELEMENTS.BUTTON_SUBMIT_PICTURE_CREATE.addEventListener('click', createPictureBlock)

    ELEMENTS.EDIT_BLOCK.style.bottom = "60%"
    ELEMENTS.PICTURE_EDITOR.style.top = "70%"
}

function closePenEditor(event){
    ELEMENTS.DRAW_BOARD.style.transform = "translateY(100%)"
    ELEMENTS.DRAW_BOARD.style.bottom = "0%"
    
    ELEMENTS.PENCIL.removeEventListener('click', closePenEditor)
    ELEMENTS.PENCIL.addEventListener('click', openPenEditor)
}

//____________rectangle_______________


let rectangleStartAndEnd = {
    start_X: 0,
    start_Y: 0,
    end_X: 0,
    end_Y: 0
}

let draftRectangleblock = 0

function createRectangle(event){
    rectangleStartAndEnd.end_X = event.clientX
    rectangleStartAndEnd.end_Y = event.clientY

    let rectangle = document.createElement("div")
    rectangle.style.width = Math.abs(rectangleStartAndEnd.start_X-rectangleStartAndEnd.end_X) + "px"
    rectangle.style.height = Math.abs(rectangleStartAndEnd.start_Y-rectangleStartAndEnd.end_Y) + "px"
    
    rectangle.classList.add("move-p-block")
    rectangle.addEventListener('mousedown', activeP)

    if(rectangleStartAndEnd.start_X < rectangleStartAndEnd.end_X) rectangle.style.left = rectangleStartAndEnd.start_X + "px"
    else rectangle.style.left = rectangleStartAndEnd.end_X + "px"
    if(rectangleStartAndEnd.start_Y < rectangleStartAndEnd.end_Y) rectangle.style.top = rectangleStartAndEnd.start_Y + "px"
    else rectangle.style.top = rectangleStartAndEnd.end_Y + "px"

    rectangle.style.backgroundColor = "black"
    document.removeEventListener("mousemove",draftRectangle)
    document.removeEventListener("mouseup",createRectangle)
    draftRectangleblock.remove()
    draftRectangleblock = 0

    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(rectangle)
    
}

function draftRectangle(event){
    if (draftRectangleblock != 0)draftRectangleblock.remove()

    rectangleStartAndEnd.end_X = event.clientX
    rectangleStartAndEnd.end_Y = event.clientY

    draftRectangleblock = document.createElement("div")
    draftRectangleblock.style.width = Math.abs(rectangleStartAndEnd.start_X-rectangleStartAndEnd.end_X) + "px"
    draftRectangleblock.style.height = Math.abs(rectangleStartAndEnd.start_Y-rectangleStartAndEnd.end_Y) + "px"
    
    draftRectangleblock.classList.add("move-p-block")
    
    if(rectangleStartAndEnd.start_X < rectangleStartAndEnd.end_X) draftRectangleblock.style.left = rectangleStartAndEnd.start_X + "px"
    else draftRectangleblock.style.left = rectangleStartAndEnd.end_X + "px"
    if(rectangleStartAndEnd.start_Y < rectangleStartAndEnd.end_Y) draftRectangleblock.style.top = rectangleStartAndEnd.start_Y + "px"
    else draftRectangleblock.style.top = rectangleStartAndEnd.end_Y + "px"
    
    draftRectangleblock.style.backgroundColor = "grey"
    
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(draftRectangleblock)
}

function createRectangleStart(event){
    document.removeEventListener("mousedown",createRectangleStart)
    rectangleStartAndEnd.start_X = event.clientX
    rectangleStartAndEnd.start_Y = event.clientY

    document.addEventListener("mousemove",draftRectangle)
    document.addEventListener("mouseup",createRectangle)
}

function drawRectangle(event){
    // setTimeout(() => {
        closePenEditor();
        document.addEventListener("mousedown",createRectangleStart)
    // }, 1000);
}

//____________rectangle_______________

let ovalStartAndEnd = {
    start_X: 0,
    start_Y: 0,
    end_X: 0,
    end_Y: 0
}

let draftOvalblock = 0

function createOval(event){
    ovalStartAndEnd.end_X = event.clientX
    ovalStartAndEnd.end_Y = event.clientY

    let oval = document.createElement("div")
    oval.style.width = Math.abs(ovalStartAndEnd.start_X-ovalStartAndEnd.end_X) + "px"
    oval.style.height = Math.abs(ovalStartAndEnd.start_Y-ovalStartAndEnd.end_Y) + "px"
    
    oval.classList.add("move-p-block")
    oval.addEventListener('mousedown', activeP)

    if(ovalStartAndEnd.start_X < ovalStartAndEnd.end_X) oval.style.left = ovalStartAndEnd.start_X + "px"
    else oval.style.left = ovalStartAndEnd.end_X + "px"
    if(ovalStartAndEnd.start_Y < ovalStartAndEnd.end_Y) oval.style.top = ovalStartAndEnd.start_Y + "px"
    else oval.style.top = ovalStartAndEnd.end_Y + "px"

    oval.style.borderRadius = "50%"
    oval.style.backgroundColor = "black"
    document.removeEventListener("mousemove",draftOval)
    document.removeEventListener("mouseup",createOval)
    draftOvalblock.remove()
    draftOvalblock = 0

    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(oval)
}


function draftOval(event){
    if (draftOvalblock != 0)draftOvalblock.remove()

    ovalStartAndEnd.end_X = event.clientX
    ovalStartAndEnd.end_Y = event.clientY

    draftOvalblock = document.createElement("div")
    draftOvalblock.style.width = Math.abs(ovalStartAndEnd.start_X-ovalStartAndEnd.end_X) + "px"
    draftOvalblock.style.height = Math.abs(ovalStartAndEnd.start_Y-ovalStartAndEnd.end_Y) + "px"
    
    draftOvalblock.classList.add("move-p-block")
    
    if(ovalStartAndEnd.start_X < ovalStartAndEnd.end_X) draftOvalblock.style.left = ovalStartAndEnd.start_X + "px"
    else draftOvalblock.style.left = ovalStartAndEnd.end_X + "px"
    if(ovalStartAndEnd.start_Y < ovalStartAndEnd.end_Y) draftOvalblock.style.top = ovalStartAndEnd.start_Y + "px"
    else draftOvalblock.style.top = ovalStartAndEnd.end_Y + "px"
    
    draftOvalblock.style.backgroundColor = "grey"
    draftOvalblock.style.borderRadius = "50%"
    
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(draftOvalblock)
}

function createOvalStart(event){
    document.removeEventListener("mousedown",createOvalStart)
    ovalStartAndEnd.start_X = event.clientX
    ovalStartAndEnd.start_Y = event.clientY

    document.addEventListener("mousemove",draftOval)
    document.addEventListener("mouseup",createOval)
}

function drawOval(event){
    // setTimeout(() => {
        closePenEditor();
        document.addEventListener("mousedown",createOvalStart)
    // }, 1000);
}

//____________line_______________

let lineStartAndEnd = {
    start_X: 0,
    start_Y: 0,
    end_X: 0,
    end_Y: 0
}

let draftLineblock = 0

function createLine(event){
    lineStartAndEnd.end_X = event.clientX
    lineStartAndEnd.end_Y = event.clientY

    let line = document.createElement("div")
    line.style.height = 2 + "px"
    line.style.width = Math.abs(lineStartAndEnd.start_X-lineStartAndEnd.end_X) + "px"
    
    line.classList.add("move-p-block")
    line.addEventListener('mousedown', activeP)

    line.style.left = lineStartAndEnd.start_X + "px"

    line.style.top = lineStartAndEnd.end_Y + "px"

    line.style.backgroundColor = "black"
    document.removeEventListener("mousemove",draftLine)
    document.removeEventListener("mouseup",createLine)
    draftLineblock.remove()
    draftLineblock = 0

    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(line)
}


function draftLine(event){
    if (draftLineblock != 0)draftLineblock.remove()

    lineStartAndEnd.end_X = event.clientX
    lineStartAndEnd.end_Y = event.clientY

    draftLineblock = document.createElement("div")
    draftLineblock.style.height = 2 + "px"
    draftLineblock.style.width = Math.abs(lineStartAndEnd.start_X-lineStartAndEnd.end_X) + "px"
    
    draftLineblock.classList.add("move-p-block")
    
    draftLineblock.style.left = lineStartAndEnd.start_X + "px"    
    draftLineblock.style.top = lineStartAndEnd.end_Y + "px"
    
    draftLineblock.style.backgroundColor = "grey"
    
    ELEMENTS.OPEN_NOTE_SCREEN.appendChild(draftLineblock)
}

function createLineStart(event){
    document.removeEventListener("mousedown",createLineStart)
    lineStartAndEnd.start_X = event.clientX
    lineStartAndEnd.start_Y = event.clientY

    document.addEventListener("mousemove",draftLine)
    document.addEventListener("mouseup",createLine)
}

function drawLine(event){
    // setTimeout(() => {
        closePenEditor();
        document.addEventListener("mousedown",createLineStart)
    // }, 1000);
}

//________________pen-tools_________

function openPenEditor(event){
    ELEMENTS.DRAW_BOARD.style.transform = "translateY(0%)"
    ELEMENTS.DRAW_BOARD.style.bottom = "20%"
    
    ELEMENTS.OPTION_DRAW_SECTIONS[0].addEventListener("click",drawLine)
    ELEMENTS.OPTION_DRAW_SECTIONS[1].addEventListener("click",drawRectangle)
    ELEMENTS.OPTION_DRAW_SECTIONS[2].addEventListener("click",drawOval)

    ELEMENTS.PENCIL.removeEventListener('click', openPenEditor)
    ELEMENTS.PENCIL.addEventListener('click', closePenEditor)
}

ELEMENTS.DELETE_ACTIVE_BLOCK.addEventListener('click', deleteActiveBlock)
ELEMENTS.OPEN_NOTE_SCREEN.addEventListener('dblclick', resetActiveBlock)

ELEMENTS.PENCIL.addEventListener('click', openPenEditor)
ELEMENTS.ADD_TEXT.addEventListener('click', openTextEditor)
ELEMENTS.ADD_PICTURE.addEventListener('click', addPicture)
ELEMENTS.EDIT_TEXT.addEventListener('click', openTextReeditor)

//_______________background-edit____________

function setBGSettings(event) {
    ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundColor = ELEMENTS.OPTION_BG_C.value
    if (ELEMENTS.OPTION_CHECK_BOX_I.checked == true) ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `url("${ELEMENTS.OPTION_BG_I.value}")`
    else ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `none`
}

ELEMENTS.BUTTON_BOARD_BG_SUBMIT.addEventListener('click',setBGSettings)

//_________________open-notes_______________

let active_note;

function closeNote(event) {
    console.log(notes,active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText,active_note)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][active_note].innerHtml = String(document.querySelector(".open-note_screen").innerHTML)
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][active_note].screen = String([document.querySelector(".open-note_screen").style.backgroundColor,document.querySelector(".open-note_screen").style.backgroundImage])
    document.querySelector(".open-note").style.right = "-100%"
    document.querySelector(".open-note_screen").innerHTML = ``
    document.querySelector(".open-note_screen").style.backgroundColor = `var(--menu_color)`
    document.querySelector(".open-note_screen").style.backgroundImage = `none`
}

function openNote(obj) {
    active_note = obj.note_txt.header
    console.log(active_note)
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
            ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = `url("${obj.note_styles.picture_url}")`
        }
    } else {
        ELEMENTS.OPEN_NOTE.style.right = "0px"
        ELEMENTS.OPEN_NOTE_SCREEN.innerHTML = obj.innerHtml
        ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundColor = obj.screen[0]
        ELEMENTS.OPEN_NOTE_SCREEN.style.backgroundImage = obj.screen[1]
        document.querySelectorAll('.move-p-block').forEach(el => el.addEventListener('mousedown', activeP));
        document.querySelectorAll('.move-block').forEach(el => el.addEventListener('mousedown', active));
    }
}

//__________________settings________________

function closeSettings(event){
    ELEMENTS.SETTINGS_ICON.addEventListener('click', openSettings)
ELEMENTS.SETTINGS_ICON.removeEventListener('click', closeSettings)

    ELEMENTS.SETTINGS.style.transform = "translateX(-100%)"
    ELEMENTS.MAIN.style.marginLeft = `0px`
}

function openSettings(event){
ELEMENTS.SETTINGS_ICON.removeEventListener('click', openSettings)
ELEMENTS.SETTINGS_ICON.addEventListener('click', closeSettings)

    ELEMENTS.SETTINGS.style.transform = "translateX(0px)"
    ELEMENTS.MAIN.style.marginLeft = ELEMENTS.SETTINGS.offsetWidth + "px"
}

ELEMENTS.SETTINGS_ICON.addEventListener('click', openSettings)

// ___________open-visual-settings___________

ELEMENTS.BUTTON_SUBMIT_VISUAL_SETTINGS.addEventListener('click', e => {
    document.querySelector(':root').style.setProperty("--menu_color", ` ${ELEMENTS.OPTION_MAIN_BASE_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--fontFamily", `${document.querySelector(".right-board_font-input-vs").value}`);
    document.querySelector(':root').style.setProperty("--notes_color", ` ${ELEMENTS.OPTION_MAIN_SECOND_BASE_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--button_color", ` ${ELEMENTS.OPTION_MAIN_BUTTON_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--txt_color", ` ${ELEMENTS.OPTION_MAIN_TXT_COLOR.value}`);
    document.querySelector(':root').style.setProperty("--header_font-size", `${ELEMENTS.OPTION_MAIN_HEADER_FONT_SIZE.value}px`);
    document.querySelector(':root').style.setProperty("--text_font-size", `${ELEMENTS.OPTION_MAIN_TEXT_FONT_SIZE.value}px`);

    console.log(document.querySelector(".right-board_font-input-vs").value)
    // ELEMENTS.MENU_HEADER.innerText = ELEMENTS.OPTION_MAIN_HEADER.value;
})

ELEMENTS.BUTTON_VISUAL_SETTINGS.addEventListener('click', e => {
    ELEMENTS.MAIN.style.transform = `translateY(${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.VISUAL_SETTINGS.style.transform = "translateY(0)"
    closeSettings();
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
                    <div class="note-header_note-add">+ добавить </div><input type="text" placeholder="поиск..." class="note-header_search menu_search"></input>
                </div>
    `;
    NOTE_TEMP.querySelector(".note-header_main").addEventListener('click', openHeader);

    NOTE_TEMP.querySelector(".note-header_search").addEventListener("input",e=>{
        searchNote(NOTE_TEMP.querySelector(".note-header_note-list"),NOTE_TEMP.querySelector(".note-header_search").value);
    })

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
        let el = NOTE_TEMP
        active_header = el.parentElement
        console.log(el)
        openNote(notes[el.parentElement.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerHTML][el.querySelector(".note-header_header-child").innerText])
        ELEMENTS.BUTTON_RESET_OPEN_NOTE.addEventListener('click', closeNote)
    })

    active_header.querySelectorAll(".note-header_delete-child").forEach(el => el.addEventListener('click', e => {
        delete notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][name];
        deleteChild(e);
        checkHeaderCount(active_header);
    }));
    document.querySelectorAll(".note-header_note-add").forEach(el => el.addEventListener('click', openNoteSettings));

    // document.querySelector

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
    notes[active_header.parentElement.querySelector(".note-header_main").querySelector(".note-header_name").innerText][ELEMENTS.OPTION_HEAD.value]["screen"] = [0,0]
    let noteOBJ = {
        note_txt: note_txt,
        note_styles: note_styles,
        innerHtml: 0,
    }
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
//  ___________open-shortcuts-settings___________

ELEMENTS.BUTTON_SHORTCUTS_SETTINGS.addEventListener('click', (e) => {
    ELEMENTS.SETTINGS.style.transform = "translateX(-100%)"
    ELEMENTS.MAIN.style.transform = `translateX(-${document.querySelector("body").offsetWidth}px)`;
    ELEMENTS.SHORTCUTS.style.transform = "translateX(0%)"
})
ELEMENTS.SHORTCUTS_EXIT.addEventListener('click', (e) => {
    ELEMENTS.MAIN.style.transform = `translateX(0px)`;
    ELEMENTS.SETTINGS.style.transform = "translateX(0%)"
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
function listenerRemoveV5(e) {
    ELEMENTS.BUTTON_SHORTCUTSV5.innerText = `текущая настройка: 'Alt + ${e.key}'`;
    window.removeEventListener('keydown', listenerRemoveV5);
    OpenTechnical = e.code;
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
ELEMENTS.BUTTON_SHORTCUTSV5.addEventListener('click', () => {
    window.addEventListener('keydown', listenerRemoveV5);
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
    else if (OpenTechnical === ev.code && ev.altKey) {
        ev.preventDefault();
        ELEMENTS.TECHNICAL.style.transform = "translateY(0px)";
    }
});
//_________open-technical__________
ELEMENTS.BUTTON_TECHNICAL_SETTINGS.addEventListener('click', (e) => {
    ELEMENTS.SETTINGS.style.transform = "translateX(-100%)"
    ELEMENTS.MAIN.style.transform = `translateY(-${ELEMENTS.MAIN.offsetHeight}px)`;
    ELEMENTS.TECHNICAL.style.transform = "translateY(0%)"
})
ELEMENTS.TECHNICAL_EXIT.addEventListener('click', (e) => {
    ELEMENTS.SETTINGS.style.transform = "translateX(0%)"
    ELEMENTS.MAIN.style.transform = `translateX(0px)`;
    ELEMENTS.TECHNICAL.style.transform = "translateY(130%)"
})
//__________use-technical_________
ELEMENTS.BUTTON_TECHNICALV1.addEventListener('click', () => {
    ELEMENTS.TECHNICAL_SCREEN.innerText = version
    ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '55px'
    ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(0%)';
    setTimeout(() => {
        ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(330%)';
    }, 2000);
});
ELEMENTS.BUTTON_TECHNICALV2.addEventListener('click', () => {
    ELEMENTS.TECHNICAL_SCREEN.innerText = developers
    ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '35px'
    ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(0%)';
    setTimeout(() => {
        ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(330%)';
    }, 2000);
});
ELEMENTS.BUTTON_TECHNICALV3.addEventListener('click', () => {
    ELEMENTS.TECHNICAL_SCREEN.innerText = data
    ELEMENTS.TECHNICAL_SCREEN.style.fontSize = '55px'
    ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(0%)';
    setTimeout(() => {
        ELEMENTS.TECHNICAL_SCREEN.style.transform = 'translateX(330%)';
    }, 2000);
});
